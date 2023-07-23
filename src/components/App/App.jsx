import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRouteElement';
import Main from '../pages/Main';
import './App.css';
import NoPage from '../pages/NoPage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Movies from '../pages/Movies';
import SavedMovies from '../pages/SavedMovies';
import Profile from '../pages/Profile';
import getInitialFilms from '../../utils/MoviesApi';
import Preloader from '../Movies/Preloader/Preloader';

import {
  register,
  authorize,
  getContent,
  userInformationForSave,
  getSaveMovie,
  putSave,
  deleteSave,
} from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SearchContext } from '../../contexts/SearchContext';

function App() {
  const [matches, setMatches] = useState(false);
  const useBurgerMenu = () => {
    const handleResize = () => {
      const matchMediaFn = window.matchMedia;
      if (!matchMediaFn) return false;
      const device = matchMediaFn('(max-width: 768px)');
      setMatches(device.matches);
    };

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return matches;
  };

  let matchesDevice = useBurgerMenu(matches);
  const navigate = useNavigate();
  const location = useLocation();

  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [searchFilms, setSearchFilms] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [profileSuccessful, setProfileSuccessful] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [noFilms, setNoFilms] = useState('');
  const [saveFilms, setSaveFilms] = useState([]);

  useEffect(() => {
    if (isTokenChecked) {
      <Preloader />;
    }
    setLoggedIn(false);
    tokenCheck();
  }, []);

  useEffect(() => {
    const foundedFilms = JSON.parse(localStorage.getItem('foundedFilms'));
    if (foundedFilms && foundedFilms.length > 0) {
      setFilteredFilms(foundedFilms);
    }

    const searchValue = localStorage.getItem('searchValue');
    if (searchValue && searchValue !== '') {
      setSearchFilms(searchValue);
    }
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt !== 'undefined') {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            navigate(location, { replace: true });
          }
        })
        .finally(!isTokenChecked)
        .catch((err) => console.log(err));
    }
  };

  function signOut() {
    localStorage.clear();
    navigate('/', { replace: true });
    setLoggedIn(false);
    setUserData('');
  }

  function handleRegistrationClick(name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setSuccessful(true);
          console.log(res);
        }
        authorize(email, password)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser({ name, email });
              localStorage.setItem('jwt', res.token);
              navigate('/movies', { replace: true });
            }
          })
          .catch((err) => {
            setSuccessful(false);
          });
      })
      .catch((err) => {
        setSuccessful(false);
        setErrorMessage(err);
      });
  }

  function handleLoginClick(email, password) {
    authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          navigate('/movies', { replace: true });
        }
      })
      .then(() => {
        const jwt = localStorage.getItem('jwt');
        getContent(jwt).then(({ name, email }) =>
          setCurrentUser({ name, email })
        );
      })
      .catch((err) => {
        setSuccessful(false);
        setErrorMessage(err);
        console.log(err);
      });
  }

  const handleUpdateUser = (data) => {
    userInformationForSave(data.name, data.email)
      .then(({ name, email }) => {
        setProfileSuccessful(true);
        setCurrentUser({ name, email });
      })
      .catch((e) => {
        setProfileSuccessful(false);
        setErrorMessage(e);
        localStorage.setItem('error', e);
      });
  };

  const filmsMapper = (films, saveFilms) => {
    return films.map((film) => {
      console.log();
      return {
        ...film,
        isLiked: saveFilms
          .map((saveFilm) => saveFilm.movieId)
          .includes(film.id),
        savedMovieId: saveFilms.find((saveFilm) => saveFilm.movieId === film.id)
          ?._id,
      };
    });
  };
  const getSavedFilms = () => {
    return getSaveMovie()
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e);
      });
  };

  const handleSearch = async (searchString) => {
    setIsLoading(true);
    Promise.allSettled([getSavedFilms(), getInitialFilms()])
      .then((responses) => {
        const savedFilms = responses[0].value || [];
        const films = responses[1].value || [];
        const mappedFilms = filmsMapper(films, savedFilms);
        setFilms(mappedFilms);
        const filteredFilms = loadingFilms(mappedFilms, searchString);
        localStorage.setItem('foundedFilms', JSON.stringify(filteredFilms));
        setFilteredFilms(filteredFilms);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setSearchFilms(searchString);
  };

  const [noFilmsFound, setNoFilmsFound] = useState(false);

  const loadingFilms = (films, searchString = '') => {
    let filteredFilms = films;
    if (searchString !== '') {
      filteredFilms = filteredFilms.filter((movie) => {
        if (!searchString.trim()) {
          return false;
        }
        return (
          movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()
        ).includes(searchString.toLowerCase());
      });
      const isShortFilm = localStorage.getItem('shortFilm') === 'true';
      if (isShortFilm) {
        filteredFilms = filteredFilms.filter((movie) => movie.duration < 40);
      }
      if (filteredFilms.length === 0) {
        setNoFilmsFound(true);
      }
      return filteredFilms;
    }
  };

  const saveFilmButton = (movie) => {
    if (movie.isLiked) {
      deleteSave(movie.savedMovieId).then((res) => {
        handleSearch(searchFilms);
      });
    } else {
      putSave({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }).then(() => {
        handleSearch(searchFilms);
      });
    }
  };
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <SearchContext.Provider value={{ searchFilms }}>
        <Routes>
          <Route
            path="/"
            element={<Main loggedIn={loggedIn} matches={matchesDevice} />}
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegistrationClick={handleRegistrationClick}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLoginClick={handleLoginClick}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={loggedIn}
                matches={matchesDevice}
                films={filteredFilms}
                isLoading={isLoading}
                saveFilmButton={saveFilmButton}
                searchString={searchFilms}
                handleSearch={handleSearch}
                noFilmsFound={noFilmsFound}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                matches={matchesDevice}
                noFilms={noFilms}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={loggedIn}
                matches={matchesDevice}
                signOut={signOut}
                onUpdateUser={handleUpdateUser}
                errorMessage={errorMessage}
                setSuccessful={profileSuccessful}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </SearchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

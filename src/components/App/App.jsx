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
import { DURATION } from '../../utils/constants';

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

  const initRenderMoviesList = () => {
    const searchValue = localStorage.getItem('searchValue');
    const allMovies = localStorage.getItem('allMovies');
    if (searchValue && searchValue !== '' && allMovies && allMovies !== '') {
      doSearch(JSON.parse(allMovies), searchValue);
      setSearchFilms(searchValue);
      setFilms(JSON.parse(allMovies));
    }
  };

  const handleSetSaveFilms = (saveFilms) => {
    setSaveFilms(saveFilms);
  };

  const tokenCheck = async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt !== 'undefined') {
      try {
        const res = await getContent(jwt);
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          await loadSavedFilms();
          initRenderMoviesList();
          navigate(location, { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    setUserData('');
  }

  function handleRegistrationClick(name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setSuccessful(true);
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

  //загружаем все сохраненные фильмы
  const loadSavedFilms = async () => {
    try {
      const res = await getSaveMovie();
      if (res) {
        setSaveFilms(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(e);
    }
  };

  //Обновляем сохраненные фильмы
  useEffect(() => {
    setSaveFilms(JSON.parse(localStorage.getItem('savedMovies')));
  }, [setSaveFilms, loggedIn]);

  //Загружаем и сохраняем все фильмы в ЛС
  const loadInitialMovies = async () => {
    const response = await getInitialFilms();
    let movies = [];
    if (response.length) {
      movies = response;
      localStorage.setItem('allMovies', JSON.stringify(movies));
    }
    return movies;
  };

  // Копируем фильмы в фильтрующиеся
  const doSearch = (allMovies, searchString) => {
    const filteredFilms = loadingFilms(allMovies, searchString);
    setFilteredFilms(filteredFilms);
  };

  //Поиск по фильмам
  const handleSearch = async (searchString) => {
    setIsLoading(true);
    let cachedMovies = localStorage.getItem('allMovies');
    if (cachedMovies) {
      cachedMovies = JSON.parse(cachedMovies);
      console.log(cachedMovies);
      doSearch(cachedMovies, searchString);
    } else {
      cachedMovies = await loadInitialMovies();
      doSearch(cachedMovies, searchString);
    }
    setIsLoading(false);
    setFilms(cachedMovies);
    setSearchFilms(searchString);
  };

  const [noFilmsFound, setNoFilmsFound] = useState(false);

  //Фильтрация
  const loadingFilms = (films, searchString = '') => {
    setNoFilmsFound(false);
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
        filteredFilms = filteredFilms.filter(
          (movie) => movie.duration < DURATION.SHORT_TRESHOLD
        );
      }
      if (filteredFilms.length === 0) {
        setNoFilmsFound(true);
      }
      return filteredFilms;
    }
  };

  //Кнопка лайка и дизлайка
  const saveFilmButton = (movie) => {
    //Если фильм есть в сохраненных
    console.log(movie);
    const isLikedMovie = saveFilms.find((film) => film.movieId === movie.id);
    if (isLikedMovie) {
      console.log(isLikedMovie);
      deleteSave(isLikedMovie._id)
        .then((res) => {
          //Запиши в новую переменную все фильмы, кроме того, что удалили
          const updatedSavedMovies = saveFilms.filter(
            (film) => film._id !== isLikedMovie._id
          );
          //Сохраняем
          setSaveFilms(updatedSavedMovies);
          localStorage.setItem(
            'savedMovies',
            JSON.stringify(updatedSavedMovies)
          );
        })
        .catch((error) => console.log(error));
    } else {
      //если нет в сохраненных
      putSave({
        ...movie,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }).then((res) => {
        //Проходимся по всем фильмам и ищем фильм с лайкнутым id
        console.log(films);
        if (!saveFilms.find((film) => film._id === res._id)) {
          setSaveFilms([...saveFilms, res]);
          localStorage.setItem(
            'savedMovies',
            JSON.stringify([...saveFilms, res])
          );
        }

        //Записываем все новые фильмы и пришедший с сервера фильм
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
              <ProtectedRouteElement
                element={Register}
                loggedIn={!loggedIn}
                handleRegistrationClick={handleRegistrationClick}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRouteElement
                element={Login}
                loggedIn={!loggedIn}
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
                saveFilms={saveFilms}
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
                handleSetSaveFilms={handleSetSaveFilms}
                searchString={searchFilms}
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

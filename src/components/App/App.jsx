import { Routes, Route, useNavigate } from 'react-router-dom';
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

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [searchFilms, setSearchFilms] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');

  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  const [isTokenChecked, setIsTokenChecked] = useState(true);

  //работает, но не записывает
  useEffect(() => {
    getInitialFilms()
      .then((arr) => {
        setFilms(arr);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isTokenChecked) {
      <Preloader />;
    }
    setLoggedIn(false);
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt !== 'undefined') {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            navigate('/movies', { replace: true });
          }
        })
        .finally(!isTokenChecked)
        .catch((err) => console.log(err));
    }
  };

  function signOut() {
    setLoggedIn(false);
    setUserData('');
    localStorage.removeItem('jwt');
  }

  function handleRegistrationClick(name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setSuccessful(true);
          navigate('/signin', { replace: true });
        }
      })
      .then(() => {
        authorize(email, password)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              localStorage.setItem('jwt', res.token);
              navigate('/movies', { replace: true });
            }
          })
          .catch((err) => {
            setSuccessful(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setSuccessful(false);
        console.log(err);
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
      .catch((err) => {
        setSuccessful(false);
        console.log(err);
      });
  }

  const handleUpdateUser = (data) => {
    console.log(data);

    userInformationForSave(data.name, data.email)
      .then(({ name, email }) => setCurrentUser({ name, email }))
      .catch((e) => console.log(e));
  };

  const handleSearch = (data) => {
    console.log('111');
    setSearchFilms(data);
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
              <Register handleRegistrationClick={handleRegistrationClick} />
            }
          />
          <Route
            path="/signin"
            element={<Login handleLoginClick={handleLoginClick} />}
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={loggedIn}
                matches={matchesDevice}
                films={films}
                isLoading={isLoading}
                handleSearch={handleSearch}
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

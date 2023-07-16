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
  const location = useLocation();
  const [isTokenChecked, setIsTokenChecked] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
            navigate(location, { replace: true });
          }
        })
        .finally(!isTokenChecked)
        .catch((err) => console.log(err));
    }
  };

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData('');
  }

  function handleRegistrationClick(name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setSuccessful(true);
          navigate('/signin', { replace: true });
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
        localStorage.setItem('errorRegistration', err);
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
        setErrorMessage(err);
        localStorage.setItem('errorLogin', err);
        console.log(err);
      });
  }

  const handleUpdateUser = (data) => {
    userInformationForSave(data.name, data.email)
      .then(({ name, email }) => setCurrentUser({ name, email }))
      .catch((e) => {
        console.log(e);
        setErrorMessage(e);
        localStorage.setItem('error', e);
      });
  };

  const handleSearch = async (data) => {
    if (!films.length) {
      setIsLoading(true);
      const arr = await getInitialFilms();
      setFilms(arr);
      setIsLoading(false);
    }
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
                errorMessage={errorMessage}
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

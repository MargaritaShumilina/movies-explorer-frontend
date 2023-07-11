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

import { register, authorize, getContent } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState('');

  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  const [isTokenChecked, setIsTokenChecked] = useState(false);

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
    setLoggedIn(false);
    tokenCheck();
  });

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
      getContent(jwt)
        .then((res) => {
          console.log(res);
          if (res) {
            setCurrentUser(res);
            console.log(res);
            navigate('/movies', { replace: true });
          } else {
            <Preloader />;
          }
        })
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
          // setUserData(email);
          localStorage.setItem('jwt', res.token);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setSuccessful(false);
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
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
              userName="Виталий"
              matches={matchesDevice}
            />
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;

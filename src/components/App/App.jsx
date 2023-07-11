import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../pages/Main';
import './App.css';
import NoPage from '../pages/NoPage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Movies from '../pages/Movies';
import SavedMovies from '../pages/SavedMovies';
import Profile from '../pages/Profile';

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

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/movies"
          element={<Movies login="true" matches={matchesDevice} />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies login="true" matches={matchesDevice} />}
        />
        <Route
          path="/profile"
          element={
            <Profile login="true" userName="Виталий" matches={matchesDevice} />
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;

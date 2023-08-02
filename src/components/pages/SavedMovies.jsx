import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList';
import { useEffect, useState } from 'react';
import { deleteSave, getSaveMovie } from '../../utils/MainApi';
import { DURATION } from '../../utils/constants';

function SavedMovies(props) {
  const [saveFilms, setSaveFilms] = useState([]);
  const [filteredFilms, setFiltereFilms] = useState([]);
  const [emptyListMessage, setEmptyListMessage] = useState('');
  const [noFilmsFound, setNoFilmsFound] = useState(false);

  const updateSavedFilms = () => {
    getSaveMovie()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        props.handleSetSaveFilms(res);
        setSaveFilms(res);
        setFiltereFilms(res);
        setNoFilmsFound(res.length === 0);
        setEmptyListMessage(
          res.length === 0 ? 'У вас нет сохраненных фильмов' : ''
        );
      })
      .catch((e) => {
        setEmptyListMessage(e);
      });
  };

  useEffect(() => {
    updateSavedFilms();
  }, []);

  useEffect(() => {
    if (saveFilms.length === 0) {
      setFiltereFilms([]);
      setNoFilmsFound(true);
    }
  }, [saveFilms]);

  const filterFilms = (saveFilms, searchString = '') => {
    let filteredFilms = saveFilms;
    if (searchString !== '') {
      filteredFilms = saveFilms.filter((movie) => {
        if (!searchString.trim()) {
          return false;
        }
        return (
          movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()
        ).includes(searchString.toLowerCase());
      });
    }

    const isShortFilm = localStorage.getItem('shortFilm') === 'true';
    if (isShortFilm) {
      filteredFilms = filteredFilms.filter(
        (movie) => movie.duration < DURATION.SHORT_TRESHOLD
      );
    }

    return filteredFilms;
  };

  const handleSearch = (searchString) => {
    const filteredFilms = filterFilms(saveFilms, searchString);

    localStorage.setItem('movies', filteredFilms);
    setFiltereFilms(filteredFilms);
    setNoFilmsFound(filteredFilms.length === 0 && searchString.trim() !== '');
    setEmptyListMessage('Ничего не найдено');
  };

  const handleDelete = (id) => {
    deleteSave(id)
      .then(() => {
        updateSavedFilms();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      <SearchForm
        handleSearch={handleSearch}
        searchString={props.searchString}
      />
      <SavedMoviesCardList
        noFilmsFound={noFilmsFound}
        saveFilms={filteredFilms}
        emptyListMessage={emptyListMessage}
        handleDelete={handleDelete}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;

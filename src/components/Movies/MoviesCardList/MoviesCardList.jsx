import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useContext, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoreBtn from '../../Movies/MoreBtn/MoreBtn';
import SearchForm from '../SearchForm/SearchForm';

import { SearchContext } from '../../../contexts/SearchContext';

function MoviesCardList(props) {
  const { searchFilms } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [shortFilm, setShortFilm] = useState(false);

  const [cardCount, setCardCount] = useState(12);
  const [loadCount, setLoadCount] = useState(3);

  const incrementPage = () => {
    setCardCount((prevCount) => prevCount + loadCount);
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      setCardCount(12);
      setLoadCount(3);
    } else if (screenWidth >= 768) {
      setCardCount(8);
      setLoadCount(2);
    } else if (screenWidth >= 320) {
      setCardCount(5);
      setLoadCount(2);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // для отслеживания фильтрации
  useEffect(() => {
    const isShortFilm = localStorage.getItem('shortFilm') === 'true';
    setShortFilm(isShortFilm);
  }, [shortFilm]);

  const loadingFilms = () => {
    let filteredFilms = props.films.filter((movie) => {
      if (!searchFilms.trim()) {
        return false;
      }
      return (
        movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()
      ).includes(searchFilms.toLowerCase());
    });
    //Не работает фильтрация короткометражек
    if (shortFilm) {
      filteredFilms = filteredFilms.filter((movie) => movie.duration < 40);
      console.log(filteredFilms);
    }

    localStorage.setItem('movies', filteredFilms);
    return filteredFilms;
  };

  const moviesByPage = () => {
    let filmsPagination = loadingFilms().slice(0, cardCount * currentPage);
    return filmsPagination;
  };

  const [totalMovies, setTotalMovies] = useState(loadingFilms().length + 1);
  const [showLoadButton, setShowLoadButton] = useState(false);

  useEffect(() => {
    setShowLoadButton(cardCount < totalMovies);
  }, [cardCount, totalMovies, shortFilm]);

  useEffect(() => {
    const filteredFilms = loadingFilms();

    setTotalMovies(filteredFilms.length);
  }, [searchFilms, shortFilm]);

  return (
    <>
      <SearchForm
        handleSubmitSearch={props.handleSubmitSearch}
        handleSearch={props.handleSearch}
      />
      <section className="movie-card-list">
        <div className="movie-card-list__container">
          {props.isLoading ? (
            <Preloader />
          ) : (
            moviesByPage().map((movie, i) => {
              return (
                <MoviesCard
                  movie={movie}
                  photo={`https://api.nomoreparties.co${movie.image.url}`}
                  key={movie.id}
                  name={movie.nameRU || movie.nameEN}
                  time={movie.duration}
                  trailerLink={movie.trailerLink}
                />
              );
            })
          )}
        </div>
      </section>
      {showLoadButton && <MoreBtn incrementPage={incrementPage} />}
    </>
  );
}

export default MoviesCardList;

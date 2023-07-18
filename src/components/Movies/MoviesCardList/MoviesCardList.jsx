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

  const [noFilmsFound, setNoFilmsFound] = useState(false);

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

  useEffect(() => {
    window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);

  const moviesByPage = () => {
    if (props.films.length === 0) {
      return [];
    }
    let filmsPagination = props.films.slice(0, cardCount * currentPage);
    return filmsPagination;
  };

  const [totalMovies, setTotalMovies] = useState(props.films.length + 1);
  const [showLoadButton, setShowLoadButton] = useState(false);

  useEffect(() => {
    setShowLoadButton(cardCount < totalMovies);
  }, [cardCount, totalMovies, shortFilm]);

  useEffect(() => {
    setTotalMovies(props.films.length);
  }, [searchFilms, shortFilm]);

  useEffect(() => {
    setNoFilmsFound(moviesByPage().length === 0 && !props.isLoading);
  }, [moviesByPage, props.isLoading]);

  return (
    <>
      <SearchForm
        handleSubmitSearch={props.handleSubmitSearch}
        searchString={props.searchString}
        handleSearch={props.handleSearch}
      />
      <section className="movie-card-list">
        <div className="movie-card-list__container">
          {noFilmsFound ? (
            <p className="movie-card-list__no-films">Ничего не найдено :(</p>
          ) : null}
          {props.isLoading ? (
            <Preloader />
          ) : (
            moviesByPage().map((movie, i) => {
              return (
                <MoviesCard
                  movie={movie}
                  photo={`https://api.nomoreparties.co${movie.image.url}`}
                  id={movie.id}
                  name={movie.nameRU || movie.nameEN}
                  time={movie.duration}
                  isLiked={movie.isLiked}
                  trailerLink={movie.trailerLink}
                  saveFilmButton={props.saveFilmButton}
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

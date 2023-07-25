import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoreBtn from '../../Movies/MoreBtn/MoreBtn';
import SearchForm from '../SearchForm/SearchForm';
import { PAGINATION, SCREEN_RESOLUTION } from '../../../utils/constants';

function MoviesCardList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [shortFilm, setShortFilm] = useState(false);

  const [cardCount, setCardCount] = useState(PAGINATION.DEFAULT_PAGE_ITEMS);
  const [loadCount, setLoadCount] = useState(PAGINATION.DEFAULT_LOAD_ITEMS);

  const incrementPage = () => {
    setCardCount((prevCount) => prevCount + loadCount);
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= SCREEN_RESOLUTION.WIDTH_1280) {
      setCardCount(PAGINATION.PAGE_ITEMS.SCREEN.WIDTH_1280.PAGE_ITEMS);
      setLoadCount(PAGINATION.PAGE_ITEMS.SCREEN.WIDTH_1280.LOAD_ITEMS);
    } else if (screenWidth >= SCREEN_RESOLUTION.WIDTH_768) {
      setCardCount(PAGINATION.PAGE_ITEMS.SCREEN.WIDTH_768.PAGE_ITEMS);
      setLoadCount(PAGINATION.PAGE_ITEMS.SCREEN.WIDTH_768.LOAD_ITEMS);
    } else if (screenWidth >= SCREEN_RESOLUTION.WIDTH_320) {
      setCardCount(PAGINATION.PAGE_ITEMS.SCREEN.WIDTH_320.PAGE_ITEMS);
      setLoadCount(PAGINATION.PAGE_ITEMS.SCREEN.WIDTH_320.LOAD_ITEMS);
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
    return () => {
      window.removeEventListener('error', (e) => {
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
    };
  }, []);

  const moviesByPage = () => {
    if (props.films.length === 0) {
      return [];
    }
    let filmsPagination = props.films.slice(0, cardCount * currentPage);
    return filmsPagination;
  };

  const [showLoadButton, setShowLoadButton] = useState(false);

  useEffect(() => {
    setShowLoadButton(cardCount < props.films.length);
  }, [cardCount, props.films.length, shortFilm]);

  function handleSearchMovies(search) {
    setCardCount(PAGINATION.DEFAULT_PAGE_ITEMS);
    props.handleSearch(search);
  }

  return (
    <>
      <SearchForm
        searchString={props.searchString}
        handleSearch={handleSearchMovies}
      />
      <section className="movie-card-list">
        <div className="movie-card-list__container">
          {props.noFilmsFound ? (
            <p className="movie-card-list__no-films">Ничего не найдено :(</p>
          ) : null}
          {props.isLoading ? (
            <Preloader />
          ) : (
            moviesByPage().map((movie, i) => {
              return (
                <MoviesCard
                  key={`${i}_${movie.id}`}
                  movie={movie}
                  photo={`https://api.nomoreparties.co${movie.image.url}`}
                  id={movie.id}
                  name={movie.nameRU || movie.nameEN}
                  time={movie.duration}
                  trailerLink={movie.trailerLink}
                  saveFilmButton={props.saveFilmButton}
                  saveFilms={props.saveFilms}
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

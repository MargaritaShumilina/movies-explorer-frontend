import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useContext } from 'react';
import Preloader from '../Preloader/Preloader';
import MoreBtn from '../../Movies/MoreBtn/MoreBtn';
import SearchForm from '../SearchForm/SearchForm';

import { SearchContext } from '../../../contexts/SearchContext';

function MoviesCardList(props) {
  const { searchFilms } = useContext(SearchContext);
  let currentLimit = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const moviesByPage = () => {
    let filmsPagination = loadingFilms().slice(0, currentPage * currentLimit);
    return filmsPagination;
  };

  const loadingFilms = () => {
    let filteredFilms = props.films.filter((movie) => {
      return (
        movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()
      ).includes(searchFilms.toLowerCase());
    });
    return filteredFilms;
  };

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
                  photo={`https://api.nomoreparties.co${movie.image.url}`}
                  key={movie.id}
                  name={movie.nameRU || movie.nameEN}
                  time={movie.duration}
                />
              );
            })
          )}
        </div>
      </section>
      <MoreBtn incrementPage={incrementPage} />
    </>
  );
}

export default MoviesCardList;

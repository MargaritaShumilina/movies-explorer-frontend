import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MoviesList } from '../../../utils/constants';
import { getInitialFilms } from '../../../utils/MoviesApi';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoreBtn from '../../Movies/MoreBtn/MoreBtn';

function MoviesCardList(props) {
  return (
    <>
    <section className="movie-card-list">
      <div className="movie-card-list__container">
        {props.isLoading ? (
          <Preloader />
        ) : (
          MoviesList.map((movie, i) => {
            return (
              <MoviesCard
                // photo={`https://api.nomoreparties.co+${movie.image.url}`}
                key={movie.id}
                name={movie.nameRU}
                saveMovie={movie.saveMovie}
                time={movie.duration}
              />
            );
          })
        )}
      </div>
    </section>
    <MoreBtn /></>
  );
}

export default MoviesCardList;

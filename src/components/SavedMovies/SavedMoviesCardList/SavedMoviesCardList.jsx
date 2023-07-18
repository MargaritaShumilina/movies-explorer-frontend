import React from 'react';

import '../../Movies/MoviesCardList/MoviesCardList.css';
import './SavedMoviesCardList.css';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';

import { useState, useEffect } from 'react';

function SavedMoviesCardList({
  noFilmsFound,
  emptyListMessage,
  saveFilms,
  handleDelete,
}) {
  return (
    <section className="movie-card-list saved-movie-card-list">
      {noFilmsFound ? (
        <div>Ничего не найдено :(</div>
      ) : (
        <div>{emptyListMessage}</div>
      )}
      <div className="movie-card-list__container">
        {saveFilms.map((movie, i) => {
          return (
            <SavedMoviesCard
              trailerLink={movie.trailerLink}
              photo={movie.image}
              key={movie._id}
              id={movie._id}
              name={movie.nameRU}
              time={movie.duration}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </section>
  );
}

export default SavedMoviesCardList;

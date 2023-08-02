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
  return (
    <section className="movie-card-list saved-movie-card-list">
      {noFilmsFound ? (
        emptyListMessage && <div>{emptyListMessage}</div>
      ) : (
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
      )}
    </section>
  );
}

export default SavedMoviesCardList;

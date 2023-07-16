import '../../Movies/MoviesCardList/MoviesCardList.css';
import './SavedMoviesCardList.css';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import { getSaveMovie } from '../../../utils/MainApi';

import { useState, useEffect } from 'react';

function SavedMoviesCardList() {
  const [saveFilms, setSaveFilms] = useState([]);
  useEffect(() => {
    getSaveMovie().then((res) => {
      setSaveFilms(res);
    });
  }, []);

  return (
    <section className="movie-card-list saved-movie-card-list">
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
            />
          );
        })}
      </div>
    </section>
  );
}

export default SavedMoviesCardList;

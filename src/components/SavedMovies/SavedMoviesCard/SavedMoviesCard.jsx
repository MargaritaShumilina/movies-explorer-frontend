import '../../Movies/MoviesCard/MoviesCard.css';
import './SavedMoviesCard.css';
import Delete from '../../../images/delete-icon.svg';
import { deleteSave } from '../../../utils/MainApi';
import { convertMinutesToHours } from '../../../utils/convert';
import { useState, useEffect } from 'react';

function SavedMoviesCard({ trailerLink, photo, name, time, id }) {
  const [deleteFilms, setDeleteFilms] = useState(true);

  function handleDeleteFromSaveFilms() {
    setDeleteFilms(!deleteFilms);
    deleteSave(id);
  }

  useEffect(() => {
  }, [deleteFilms]);

  return (
    <article className="movie-card saved-movie-card">
      <a href={trailerLink}>
        <img
          src={photo}
          alt="Постер фильма Тест"
          className="movie-card__poster"
        />
      </a>
      <div className="movie-card__information saved-movie-card__information">
        <div className="movie-card__line saved-movie-card__line">
          <p className="movie-card__name saved-movie-card__name">{name}</p>
          <button type="button" className="invisible-button">
            <img
              src={Delete}
              alt="Иконка удаления"
              className="movie-card__delete main-button-style"
              onClick={handleDeleteFromSaveFilms}
            />
          </button>
        </div>

        <p className="movie-card__time">{convertMinutesToHours(time)}</p>
      </div>
    </article>
  );
}

export default SavedMoviesCard;

import { useState } from 'react';

import './MoviesCard.css';
import EnableIcon from '../../../images/active-point.svg';
import Icon from '../../../images/disabled-point.svg';
import { putSave } from '../../../utils/MainApi';
import { convertMinutesToHours } from '../../../utils/convert';

function MoviesCard({ photo, name, time, trailerLink, movie }) {
  const [saveFilms, setSaveFilms] = useState(false);

  const saveFilmButton = (e) => {
    setSaveFilms(!saveFilms);
    putSave({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    });
  };

  return (
    <section className="movie-card">
      <a href={trailerLink} target="_blank">
        <img
          src={photo}
          alt="Постер фильма Тест"
          className="movie-card__poster"
        />
      </a>
      <div className="movie-card__information">
        <div className="movie-card__line">
          <p className="movie-card__name">{name}</p>
          <button type="button" className="invisible-button">
            <img
              src={saveFilms ? EnableIcon : Icon}
              alt="Иконка сохранения"
              className="movie-card__save main-button-style"
              onClick={saveFilmButton}
            />
          </button>
        </div>
        <p className="movie-card__time">{convertMinutesToHours(time)}</p>
      </div>
    </section>
  );
}

export default MoviesCard;

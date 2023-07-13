import { useState } from 'react';

import './MoviesCard.css';
import EnableIcon from '../../../images/active-point.svg';
import Icon from '../../../images/disabled-point.svg';
import MoreBtn from '../../Movies/MoreBtn/MoreBtn';

function MoviesCard({ photo, name, time }) {
  const [saveFilms, setSaveFilms] = useState(false);
  const saveFilmButton = () => {
    setSaveFilms(!saveFilms);
    
  };

  const convertMinutesToHours = () => {
    const hours = Math.floor(time / 60);
    const remainingMinutes = time % 60;
    return `${hours}ч ${remainingMinutes}`;
  };

  return (
    <section className="movie-card">
      <img
        src={photo}
        alt="Постер фильма Тест"
        className="movie-card__poster"
      />
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
        <p className="movie-card__time">{convertMinutesToHours()}</p>
      </div>
    </section>
  );
}

export default MoviesCard;

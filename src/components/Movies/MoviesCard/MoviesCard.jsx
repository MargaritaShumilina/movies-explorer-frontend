import { useState } from 'react';

import './MoviesCard.css';
import Photo from '../../../images/test-movie-small.png';
import EnableIcon from '../../../images/active-point.svg';
import Icon from '../../../images/disabled-point.svg';

function MoviesCard(props) {
  const [saveFilms, setSaveFilms] = useState(false);
  const saveFilmButton = () => {
    setSaveFilms(!saveFilms);
  };
  return (
    <section className="movie-card">
      <img
        src={props.photo}
        alt="Постер фильма Тест"
        className="movie-card_poster"
      />
      <div className="movie-card_information">
        <div className="movie-card_line">
          <p className="movie-card_name">{props.name}</p>
          <img
            src={saveFilms ? EnableIcon : Icon}
            alt="Иконка сохранения"
            className="movie-card_save main-button-style"
            onClick={saveFilmButton}
          />
        </div>

        <p className="movie-card_time">{props.time}</p>
      </div>
    </section>
  );
}

export default MoviesCard;

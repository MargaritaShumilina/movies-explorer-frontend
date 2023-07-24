import './MoviesCard.css';
import EnableIcon from '../../../images/active-point.svg';
import Icon from '../../../images/disabled-point.svg';
import { convertMinutesToHours } from '../../../utils/convert';
import { useState } from 'react';

function MoviesCard({
  photo,
  id,
  name,
  time,
  trailerLink,
  movie,
  isLiked,
  saveFilmButton,
}) {
  const [like, setLike] = useState(false);
  const clickHandler = () => {
    saveFilmButton(movie);
    setLike(!like);
  };

  return (
    <section className="movie-card" key={id}>
      <a href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img src={photo} alt={name} className="movie-card__poster" />
      </a>
      <div className="movie-card__information">
        <div className="movie-card__line">
          <p className="movie-card__name">{name}</p>
          <button type="button" className="invisible-button">
            <img
              src={isLiked || like ? EnableIcon : Icon}
              alt="Иконка сохранения"
              className="movie-card__save main-button-style"
              onClick={clickHandler}
            />
          </button>
        </div>
        <p className="movie-card__time">{convertMinutesToHours(time)}</p>
      </div>
    </section>
  );
}

export default MoviesCard;

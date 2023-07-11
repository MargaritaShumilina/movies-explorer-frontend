import '../../Movies/MoviesCard/MoviesCard.css';
import './SavedMoviesCard.css';
import Delete from '../../../images/delete-icon.svg';

function SavedMoviesCard(props) {
  return (
    <article className="movie-card saved-movie-card">
      <img
        src={props.photo}
        alt="Постер фильма Тест"
        className="movie-card__poster"
      />
      <div className="movie-card__information saved-movie-card__information">
        <div className="movie-card__line saved-movie-card__line">
          <p className="movie-card__name saved-movie-card__name">
            {props.name}
          </p>
          <button type="button" className="invisible-button">
            <img
              src={Delete}
              alt="Иконка удаления"
              className="movie-card__delete main-button-style"
            />
          </button>
        </div>

        <p className="movie-card__time">{props.time}</p>
      </div>
    </article>
  );
}

export default SavedMoviesCard;

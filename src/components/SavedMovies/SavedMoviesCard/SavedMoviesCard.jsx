import '../../Movies/MoviesCard/MoviesCard.css';
import './SavedMoviesCard.css';
import Delete from '../../../images/delete-icon.svg';

function SavedMoviesCard(props) {
  return (
    <article className="movie-card saved-movie-card">
      <img
        src={props.photo}
        alt="Постер фильма Тест"
        className="movie-card_poster"
      />
      <div className="movie-card_information saved-movie-card_information">
        <div className="movie-card_line saved-movie-card_line">
          <p className="movie-card_name saved-movie-card_name">{props.name}</p>
          <img
            src={Delete}
            alt="Иконка удаления"
            className="movie-card_delete main-button-style"
          />
        </div>

        <p className="movie-card_time">{props.time}</p>
      </div>
    </article>
  );
}

export default SavedMoviesCard;

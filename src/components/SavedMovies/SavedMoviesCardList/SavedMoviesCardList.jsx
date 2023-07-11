import '../../Movies/MoviesCardList/MoviesCardList.css';
import './SavedMoviesCardList.css';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import { SavedMoviesList } from '../../../utils/constants';

function SavedMoviesCardList() {
  return (
    <section className="movie-card-list saved-movie-card-list">
      <div className="movie-card-list__container">
        {SavedMoviesList.map((movie, i) => {
          return (
            <SavedMoviesCard
              photo={movie.image}
              key={i}
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

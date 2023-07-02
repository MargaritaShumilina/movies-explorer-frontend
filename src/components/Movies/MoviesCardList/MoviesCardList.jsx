import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MoviesList } from '../../../utils/constants';

function MoviesCardList() {
  return (
    <section className="movie-card-list">
      <div className="movie-card-list_container">
        {MoviesList.map((movie, i) => {
          return (
            <MoviesCard
              photo={movie.image}
              key={i}
              name={movie.nameRU}
              saveMovie={movie.saveMovie}
              time={movie.duration}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MoviesCardList;

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoreBtn from '../Movies/MoreBtn/MoreBtn';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import { SearchContext } from '../../contexts/SearchContext';

import { useState, useEffect, useContext } from 'react';

function Movies(props) {
  const { searchFilms } = useContext(SearchContext);
  let currentLimit = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(setCurrentPage);
    console.log(currentPage);
  };
  const moviesByPage = () => {
    let filmsPagination = props.films.slice(0, currentPage * currentLimit);
    return filmsPagination;
  };

  const loadingFilms = () => {
    console.log(searchFilms);
    moviesByPage()
      .filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchFilms.toLowerCase());
      })
      .map((movie, i) => {
        console.log(movie.id);
        return (
          <MoviesCard
            photo={`https://api.nomoreparties.co${movie.image.url}`}
            key={movie.id}
            name={movie.nameRU}
            saveMovie={movie.saveMovie}
            time={movie.duration}
          />
        );
      });
  };

  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      {/* <SearchForm
        handlerSearchForm={props.handleSearch}
        films={props.films}
        handleFilterAllMovies={handleFilterAllMovies}
      /> */}
      <MoviesCardList
        isLoading={props.isLoading}
        films={props.films}
        loadingFilms={loadingFilms}
        incrementPage={incrementPage}
        handleSearch={props.handleSearch}
      />
      {/* <MoreBtn /> */}
      <Footer />
    </>
  );
}

export default Movies;

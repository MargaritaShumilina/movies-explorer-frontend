import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      <MoviesCardList
        errorMessage={props.errorMessage}
        isLoading={props.isLoading}
        films={props.films}
        saveFilmButton={props.saveFilmButton}
        searchString={props.searchString}
        handleSearch={props.handleSearch}
        noFilmsFound={props.noFilmsFound}
      />
      <Footer />
    </>
  );
}

export default Movies;

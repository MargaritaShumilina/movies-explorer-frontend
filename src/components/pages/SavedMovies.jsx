import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList';

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      <SearchForm />
      <SavedMoviesCardList />
      <Footer />
    </>
  );
}

export default SavedMovies;

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoreBtn from '../Movies/MoreBtn/MoreBtn';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      <SearchForm handlerSearchForm={props.handleSearch} />
      <MoviesCardList isLoading={props.isLoading} />
      {/* <MoreBtn /> */}
      <Footer />
    </>
  );
}

export default Movies;

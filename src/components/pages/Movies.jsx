import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoreBtn from '../Movies/MoreBtn/MoreBtn';

function Movies(props) {
  return (
    <>
      <Header login={props.login} matches={props.matches} />
      <SearchForm />
      <MoviesCardList />
      <MoreBtn />
      <Footer />
    </>
  );
}

export default Movies;

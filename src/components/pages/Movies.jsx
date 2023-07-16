import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoreBtn from '../Movies/MoreBtn/MoreBtn';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import { SearchContext } from '../../contexts/SearchContext';

import { useState, useEffect, useContext } from 'react';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      <MoviesCardList
        isLoading={props.isLoading}
        films={props.films}
        handleSearch={props.handleSearch}
      />
      <Footer />
    </>
  );
}

export default Movies;

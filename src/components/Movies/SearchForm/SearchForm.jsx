import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

import Search from '../../../images/search.svg';
import './SearchForm.css';
import { getInitialFilms } from '../../../utils/MoviesApi';
import { useForm } from 'react-hook-form';

function SearchForm(props) {
  const [filterFilms, setFilterFilms] = useState(true);
  const [search, setSearch] = useState('');

  const { searchFilms } = useContext(SearchContext);
  const shortFilmFilter = () => {
    setFilterFilms(!filterFilms);
    localStorage.setItem('shortFilm', filterFilms);
  };

  function handleChangeSearchInput(e) {
    setSearch(e.target.value);
  }

  function handleSubmitSearch() {
    props.handleSearch(search);
    localStorage.setItem('searchValue', search);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  return (
    <section className="search-block">
      <form className="search" onSubmit={handleSubmit(handleSubmitSearch)}>
        <div className="search__main">
          <img src={Search} alt="Иконка поиска" className="search__icon" />
          <input
            type="search"
            className="search__input"
            placeholder="Фильм"
            {...register('film', {
              required: 'Обязательное поле!',
            })}
            onChange={handleChangeSearchInput}
            value={search}
            id="search"
          />
          <div className="popup-input-error error-search">
            {errors?.film && (
              <p>{errors?.film?.message || 'Произошла ошибка!'}</p>
            )}
          </div>
        </div>
        <div className="search__container">
          <div className="search__border">
            <button
              className="search__button main-button-style"
              type="submit"
              style={{ backgroundImage: `url(${Search})` }}
              // onClick={props.handleSubmitSearch(e, search)}
              onSubmit={handleSubmit(handleSubmitSearch)}
            ></button>
          </div>
          <div className="search__short-films-filter">
            <input
              onClick={shortFilmFilter}
              id="filterFilms"
              type="checkbox"
              value={filterFilms}
              className={`search__short-films-checkbox
                ${
                  filterFilms
                    ? `search__short-films-checkbox_on`
                    : `search__short-films-checkbox_off`
                }`}
            />
            <label for="filterFilms" className="search__filter-name">
              Короткометражки
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

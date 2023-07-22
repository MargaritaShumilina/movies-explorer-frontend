import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Search from '../../../images/search.svg';
import './SearchForm.css';

function SearchForm(props) {
  const [filterFilms, setFilterFilms] = useState(() => {
    const status = localStorage.getItem('shortFilm');
    if (status && status === 'true') {
      return true;
    }
    return false;
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(props.searchString);
  }, [props.searchString]);

  const shortFilmFilter = () => {
    setFilterFilms(!filterFilms);
    localStorage.setItem('shortFilm', !filterFilms);
    handleSubmitSearch(search);
  };

  function handleChangeSearchInput(e) {
    clearErrors();
    setSearch(e.target.value);
  }

  function handleSubmitSearch() {
    localStorage.setItem('searchValue', search);
    props.handleSearch(search);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: 'onChange' });

  function onSubmit(formData) {
    const { film } = formData;
    localStorage.setItem('searchValue', film);
    props.handleSearch(film);
  }

  return (
    <section className="search-block">
      <form
        className="search"
        onSubmit={handleSubmit(handleSubmitSearch)}
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="search__main">
          <img src={Search} alt="Иконка поиска" className="search__icon" />
          <input
            type="search"
            className="search__input"
            placeholder="Фильм"
            {...register('film', {
              required: 'Нужно ввести ключевое слово!',
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
              // onSubmit={handleSubmit(handleSubmitSearch)}
            ></button>
          </div>
          <div className="search__short-films-filter">
            <input
              onChange={shortFilmFilter}
              id="filterFilms"
              type="checkbox"
              value={filterFilms}
              checked={filterFilms}
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

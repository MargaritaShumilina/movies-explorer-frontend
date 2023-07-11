import { useState } from 'react';

import Search from '../../../images/search.svg';
import './SearchForm.css';

function SearchForm() {
  const [filterFilms, setFilterFilms] = useState(true);
  const shortFilmFilter = () => {
    setFilterFilms(!filterFilms);
  };
  return (
    <section className="search-block">
      <form className="search">
        <div className="search__main">
          <img src={Search} alt="Иконка поиска" className="search__icon" />
          <input
            type="search"
            className="search__input"
            placeholder="Фильм"
            required
            id="search"
          />
        </div>
        <div className="search__container">
          <div className="search__border">
            <button
              className="search__button main-button-style"
              type="submit"
              style={{ backgroundImage: `url(${Search})` }}
            ></button>
          </div>
          <div className="search__short-films-filter">
            <input
              onClick={shortFilmFilter}
              id="filterFilms"
              type="checkbox"
              value="1"
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

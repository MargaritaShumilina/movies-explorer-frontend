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
        <div className="search_main">
          <img src={Search} alt="Иконка поиска" className="search_icon" />
          <input
            type="search"
            className="search_input"
            placeholder="Фильм"
            required
            id="search"
          />
        </div>
        <div className="search_container">
          <div className="search_border">
            <button
              className="search_button main-button-style"
              type="submit"
              style={{ backgroundImage: `url(${Search})` }}
            ></button>
          </div>
          <div className="search_short-films-filter">
            <input
              onClick={shortFilmFilter}
              id="filterFilms"
              type="checkbox"
              value="1"
              className={`search_short-films-checkbox
                ${
                  filterFilms
                    ? `search_short-films-radio__on`
                    : `search_short-films-radio__off`
                }`}
            />
            <label for="filterFilms" className="search_filter-name">
              Короткометражки
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

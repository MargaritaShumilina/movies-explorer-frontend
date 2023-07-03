import './RegisterBlock.css';
import logo from '../../images/logo.svg';

import { NavLink } from 'react-router-dom';

function RegisterBlock() {
  return (
    <section className="main-content">
      <div className="welcom-header">
        <NavLink to="/" className="main-link-style">
          <img src={logo} alt="логотип" className="auth-logo form-logo" />
        </NavLink>
        <h1 className="welcom-header__heading">Добро пожаловать!</h1>
      </div>
      <div className="main-form form-registration">
        <form className="main-form__block form-registration__block">
          <fieldset className="main-form__inputs form-registration__inputs">
            <label className="form-registration__labels">
              <p className="main-form__labels">Имя</p>
              <input
                type="text"
                className="main-form__input form-registration__input form-registration-input"
                placeholder="Виталий"
                required
                id="form-registration-name"
                maxLength="40"
                minLength="2"
              />
            </label>
            <span className="form-registration-name-error popup-input-error"></span>
            <label className="form-registration__labels">
              <p className="main-form__labels">E-mail</p>
              <input
                type="email"
                className="main-form__input form-registration__input form-registration-email"
                placeholder="pochta@yandex.ru"
                required
                id="form-registration-email"
                maxLength="40"
                minLength="5"
              />
            </label>
            <span className="popup-url-avatar-error popup-input-error"></span>
            <label className="form-registration__labels last-form-label">
              <p className="main-form__labels">Пароль</p>
              <input
                type="password"
                className="popup-input-error main-form__input form-registration__input form-registration-password"
                placeholder="Пароль"
                required
                id="form-registration-password"
                maxLength="40"
                minLength="5"
                autocomplete="current-password"
              />
            </label>
            <span className="popup-url-avatar-error popup-input-error">
              Что-то пошло не так...
            </span>
          </fieldset>
          <button
            className="main-form__button form-registration__button main-button-style"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <p className="another-way-form">
        Уже зарегистрированы?&nbsp;
        <NavLink to="/signin" className="main-link-style">
          Войти
        </NavLink>
      </p>
    </section>
  );
}

export default RegisterBlock;

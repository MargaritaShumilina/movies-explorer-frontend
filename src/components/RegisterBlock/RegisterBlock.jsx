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
        <h1 className="main-form_heading form-registration_heading">
          Добро пожаловать!
        </h1>
      </div>
      <div className="main-form form-registration">
        <form className="main-form_block form-registration_block">
          <fieldset className="main-form_inputs form-registration_inputs">
            <label className="form-registration_labels">
              <p className="main-form_labels">Имя</p>
              <input
                type="text"
                className="main-form_input form-registration_input form-registration-input"
                placeholder="Виталий"
                required
                id="form-registration-name"
                maxLength="40"
                minLength="2"
              />
            </label>
            <span className="form-registration-name-error popup-input-error"></span>
            <label className="main-form_labels form-registration_labels">
              <p className="main-form_labels">E-mail</p>
              <input
                type="email"
                className="main-form_input form-registration_input form-registration-email"
                placeholder="pochta@yandex.ru"
                required
                id="form-registration-email"
                maxLength="40"
                minLength="5"
              />
            </label>
            <span className="popup-url-avatar-error popup-input-error"></span>
            <label className="main-form_labels form-registration_labels">
              <p className="main-form_labels">Пароль</p>
              <input
                type="password"
                className="popup-input-error main-form_input form-registration_input form-registration-password"
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
            className="main-form_button form-registration_button main-button-style"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <p className="main-form_another-way">
        Уже зарегистрированы?&nbsp;
        <NavLink to="/signin" className="main-form_login-link main-link-style">
          Войти
        </NavLink>
      </p>
    </section>
  );
}

export default RegisterBlock;

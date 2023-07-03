import '../RegisterBlock/RegisterBlock.css';
import './LoginBlock.css';
import logo from '../../images/logo.svg';

import { NavLink } from 'react-router-dom';

function LoginBlock() {
  return (
    <section className="main-content">
      <div className="welcom-header">
        <NavLink to="/" className="main-link-style">
          <img src={logo} alt="логотип" className="auth-logo form-logo" />
        </NavLink>
        <h1 className="welcom-header__heading">Рады видеть!</h1>
      </div>
      <div className="main-form form-login">
        <form className="main-form__block form-login__block">
          <fieldset className="main-form__inputs form-login__inputs">
            <label className="form-login__labels">
              <p className="main-form__labels">E-mail</p>
              <input
                type="email"
                className="main-form__input form-login__input form-login__email"
                placeholder="pochta@yandex.ru"
                required
                id="form-login-email"
                maxLength="40"
                minLength="5"
              />
            </label>
            <span className="popup-url-avatar-error popup-input-error"></span>
            <label className="form-login__labels">
              <p className="main-form__labels">Пароль</p>
              <input
                type="password"
                className="main-form__input form-login__input form-login__password"
                required
                id="form-login-password"
                maxLength="40"
                minLength="5"
                autocomplete="current-password"
              />
            </label>
            <span className="popup-url-avatar-error popup-input-error"></span>
          </fieldset>
          <button
            className="main-form__button form-login__button main-button-style"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
      <p className="another-way-form">
        Еще не зарегистрированы?&nbsp;
        <NavLink to="/signup" className="main-link-style">
          Регистрация
        </NavLink>
      </p>
    </section>
  );
}

export default LoginBlock;

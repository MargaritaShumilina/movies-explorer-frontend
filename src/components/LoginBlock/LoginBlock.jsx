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
        <h1 className="main-form_heading">Рады видеть!</h1>
      </div>
      <div className="main-form form-login">
        <form className="main-form_block form-login_block">
          <fieldset className="main-form_inputs form-login_inputs">
            <label className="main-form_labels form-login_labels">
              <p className="main-form_labels">E-mail</p>
              <input
                type="email"
                className="main-form_input form-login_input form-login_email"
                placeholder="pochta@yandex.ru"
                required
                id="form-login-email"
                maxLength="40"
                minLength="5"
              />
            </label>
            <span className="popup-url-avatar-error popup-input-error"></span>
            <label className="main-form_labels form-login_labels">
              <p className="main-form_labels">Пароль</p>
              <input
                type="password"
                className="main-form_input form-login_input form-login_password"
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
            className="main-form_button form-login_button main-button-style"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
      <p className="main-form_another-way">
        Еще не зарегистрированы?&nbsp;
        <NavLink to="/signup" className="main-form_login-link main-link-style">
          Регистрация
        </NavLink>
      </p>
    </section>
  );
}

export default LoginBlock;

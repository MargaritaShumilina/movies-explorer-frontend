import '../RegisterBlock/RegisterBlock.css';
import './LoginBlock.css';
import logo from '../../images/logo.svg';

import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function LoginBlock(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  function handleSubmitLogin() {
    props.handleLoginClick(email, password);
    reset({ email: '', password: '' });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="main-content">
      <div className="welcom-header">
        <NavLink to="/" className="main-link-style">
          <img src={logo} alt="логотип" className="auth-logo form-logo" />
        </NavLink>
        <h1 className="welcom-header__heading">Рады видеть!</h1>
      </div>
      <div className="main-form form-login">
        <form
          className="main-form__block form-login__block"
          onSubmit={handleSubmit(handleSubmitLogin)}
        >
          <fieldset className="main-form__inputs form-login__inputs">
            <label className="form-login__labels">
              <p className="main-form__labels">E-mail</p>
              <input
                type="email"
                className="main-form__input form-login__input form-login__email"
                placeholder="pochta@yandex.ru"
                id="form-login-email"
                {...register('email', {
                  required: 'Поле обязательно к заполению',
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                value={email}
                onChange={handleChangeEmail}
              />
            </label>
            <div className="popup-input-error">
              {errors?.email && (
                <p>{errors?.email?.message || 'Произошла ошибка!'}</p>
              )}
            </div>
            <label className="form-login__labels">
              <p className="main-form__labels">Пароль</p>
              <input
                type="password"
                className="main-form__input form-login__input form-login__password"
                id="form-login-password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Поле обязательно к заполению',
                })}
                value={password}
                onChange={handleChangePassword}
              />
            </label>
            <div className="popup-input-error">
              {errors?.password && (
                <p>{errors?.password?.message || 'Произошла ошибка!'}</p>
              )}
            </div>
          </fieldset>
          <button
            className={`main-form__button form-login__button main-button-style ${
              !isValid ? 'profile__button_disabled' : ''
            }`}
            type="submit"
            onSubmit={handleSubmit(handleSubmitLogin)}
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

import '../RegisterBlock/RegisterBlock.css';
import './LoginBlock.css';
import logo from '../../images/logo.svg';

import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function LoginBlock(props) {
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {}, [props.errorMessage]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, props.errorMessage]);

  function handleSubmitLogin() {
    const email = getValues('email');
    const password = getValues('password');
    props.handleLoginClick(email, password);
    reset({ email: '', password: '' });
    setDisabled(true);
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
                  required: true,
                  pattern:
                    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                })}
              />
            </label>
            <div className="popup-input-error">
              {errors.email?.type === 'required' && (
                <p>Поле обязательно к заполению</p>
              )}
              {errors.email?.type === 'pattern' && (
                <p>Ошибка! Введите корректный Email</p>
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
              />
            </label>
            <div className="popup-input-error">
              {errors?.password && (
                <p>{errors?.password?.message || 'Произошла ошибка!'}</p>
              )}
            </div>
          </fieldset>
          <div>
            <p className="profile__error">{props.errorMessage}</p>
          </div>
          <button
            className={`main-form__button form-login__button main-button-style ${
              !isValid ? 'profile__button_disabled' : ''
            }`}
            type="submit"
            disabled={!isValid}
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

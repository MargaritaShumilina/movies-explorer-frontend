import './RegisterBlock.css';
import logo from '../../images/logo.svg';

import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function RegisterBlock(props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  function handleSubmitRegistration() {
    console.log(name, email, password);
    props.handleRegistrationClick(name, email, password);
    reset({ name: '', email: '', password: '' });
    if (localStorage.getItem('errorRegistration') !== null) {
      setDisabled(true);
    }
    setDisabled(true);
  }

  useEffect(() => {}, [props.errorMessage]);

  useEffect(() => {
    localStorage.removeItem('errorRegistration');
  }, [name, email, password]);

  function handleChangeName(e) {
    setDisabled(false);
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setDisabled(false);
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setDisabled(false);
    setPassword(e.target.value);
  }

  return (
    <section className="main-content">
      <div className="welcom-header">
        <NavLink to="/" className="main-link-style">
          <img src={logo} alt="логотип" className="auth-logo form-logo" />
        </NavLink>
        <h1 className="welcom-header__heading">Добро пожаловать!</h1>
      </div>
      <div className="main-form form-registration">
        <form
          className="main-form__block form-registration__block"
          onSubmit={handleSubmit(handleSubmitRegistration)}
        >
          <fieldset className="main-form__inputs form-registration__inputs">
            <label className="form-registration__labels">
              <p className="main-form__labels">Имя</p>
              <input
                type="text"
                className="main-form__input form-registration__input form-registration-input"
                placeholder="Виталий"
                id="form-registration-name"
                {...register('name', {
                  required: 'Поле обязательно к заполению',
                  minLength: {
                    value: 2,
                    message: 'Минимум 2 символа',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Максимум 40 символов',
                  },
                  pattern: /^[A-Za-zА-Яа-яЁё /s -]+$/,
                })}
                value={name}
                onChange={handleChangeName}
              />
            </label>
            <div className="popup-input-error">
              {errors?.name && (
                <p>{errors?.name?.message || 'Произошла ошибка!'}</p>
              )}
            </div>
            <label className="form-registration__labels">
              <p className="main-form__labels">E-mail</p>
              <input
                type="email"
                className="main-form__input form-registration__input form-registration-email"
                placeholder="pochta@yandex.ru"
                id="form-registration-email"
                {...register('email', {
                  required: 'Поле обязательно к заполению',
                  pattern:
                    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
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
            <label className="form-registration__labels last-form-label">
              <p className="main-form__labels">Пароль</p>
              <input
                type="password"
                className="main-form__input form-registration__input form-registration-password"
                placeholder="Пароль"
                id="form-registration-password"
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
          <div>
            <p className="profile__error">{props.errorMessage}</p>
          </div>
          <button
            className={`main-form__button form-registration__button main-button-style ${
              !isValid || disabled ? 'profile__button_disabled' : ''
            }`}
            type="submit"
            disabled={disabled}
            onSubmit={handleSubmit(handleSubmitRegistration)}
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

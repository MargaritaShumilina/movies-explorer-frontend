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
    getValues,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {}, [props.errorMessage]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, props.errorMessage]);

  const [disabled, setDisabled] = useState(true);

  function handleSubmitRegistration() {
    const name = getValues('name');
    const email = getValues('email');
    const password = getValues('password');
    props.handleRegistrationClick(name, email, password);
    reset({ name: '', email: '', password: '' });
    setDisabled(true);
  }

  useEffect(() => {}, [props.errorMessage]);

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
              />
            </label>
            <div className="popup-input-error">
              {errors.name?.type === 'required' && (
                <p>Поле обязательно к заполению</p>
              )}
              {errors.name?.type === 'pattern' && (
                <p>
                  Ошибка! Имя не должно содержать цифры и другие символы, кроме
                  -
                </p>
              )}
              {errors.name?.type === 'minLength' && (
                <p>{errors?.name?.message || 'Произошла ошибка!'}</p>
              )}
              {errors.name?.type === 'maxLength' && (
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
              !isValid ? 'profile__button_disabled' : ''
            }`}
            type="submit"
            disabled={!isValid}
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

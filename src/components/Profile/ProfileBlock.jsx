import { NavLink } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

import './ProfileBlock.css';

function ProfileBlock(props) {
  const [edit, setEdit] = useState(false);
  const [disabledInputs, setDisabledInputs] = useState(true);

  const [userSuccess, setUserSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { currentUser } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  function error() {
    if (localStorage.getItem('error') === null) {
      const locNull = '';
      return locNull;
    }
    const locNeNull = `${localStorage.getItem('error')}`;
    return locNeNull;
  }

  useEffect(() => {
    setTimeout(handleChange, 1000);
  }, [props.setSuccessful]);

  useEffect(() => {}, [props.errorMessage]);

  useEffect(() => {
    reset(currentUser);
    setUserSuccess(false);
  }, [currentUser]);

  const handleEdit = () => {
    setEdit(!edit);
    setDisabledInputs(!disabledInputs);
  };

  function handleChange() {
    if (props.setSuccessful) {
      setEdit(false);
      setDisabledInputs(!disabledInputs);
      setUserSuccess(true);
    }
  }

  function handleSubmitProfile() {
    localStorage.removeItem('error');
    const name = getValues('name');
    const email = getValues('email');
    props.onUpdateUser({
      name: name,
      email: email,
    });
    reset(currentUser);
    setButtonDisabled(true);
    setTimeout(handleChange, 1000);
  }

  return (
    <section className="profile">
      <div className="profile__block">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__form-block">
          <form
            className="profile__form"
            onSubmit={handleSubmit(handleSubmitProfile)}
          >
            <fieldset className="profile__inputs">
              <div className="profile__inputs-style">
                <label for="form-profile-name" className="profile__label">
                  Имя
                </label>
                <input
                  type="text"
                  className="profile__input"
                  id="form-profile-name"
                  maxLength="40"
                  minLength="5"
                  disabled={disabledInputs}
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
                    onChange: (e) => {
                      setButtonDisabled(e.target.value === currentUser.name);
                    },
                  })}
                />
              </div>
              <div className="popup-input-error">
                {errors.name?.type === 'required' && (
                  <p>Поле обязательно к заполению</p>
                )}
                {errors.name?.type === 'validate' && (
                  <p>Имя должно отличаться</p>
                )}
                {errors.name?.type === 'pattern' && (
                  <p>
                    Ошибка! Имя не должно содержать цифры и другие символы,
                    кроме -
                  </p>
                )}
                {errors.name?.type === 'minLength' && (
                  <p>{errors?.name?.message || 'Произошла ошибка!'}</p>
                )}
                {errors.name?.type === 'maxLength' && (
                  <p>{errors?.name?.message || 'Произошла ошибка!'}</p>
                )}
              </div>
              <div className="profile__inputs-style profile__inputs-style-last-child">
                <label htmlFor="form-profile-email" className="profile__label">
                  Email
                </label>
                <input
                  type="email"
                  className="profile__input"
                  placeholder="E-mail"
                  id="form-profile-email"
                  maxLength="40"
                  minLength="5"
                  disabled={disabledInputs}
                  {...register('email', {
                    required: 'Ошибка! Введите корректный Email',
                    pattern:
                      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    onChange: (e) => {
                      setButtonDisabled(e.target.value === currentUser.name);
                    },
                  })}
                />
              </div>
              <div className="popup-input-error">
                {errors.email?.type === 'validate' && (
                  <p>Почта должно отличаться</p>
                )}
                {errors.email?.type === 'required' && (
                  <p>Поле обязательно к заполению</p>
                )}
                {errors.email?.type === 'pattern' && (
                  <p>Ошибка! Введите корректный Email</p>
                )}
              </div>
            </fieldset>
          </form>
        </div>
        <div>
          <p className={`profile__error`}>{error()}</p>
        </div>
        {!edit && (
          <>
            <button
              className="profile__edit main-link-style"
              type="submit"
              onClick={handleEdit}
            >
              Редактировать
            </button>

            <div className="profile__link-container">
              <NavLink
                to="/"
                className="profile__link main-link-style"
                onClick={props.signOut}
              >
                Выйти из аккаунта
              </NavLink>
            </div>
          </>
        )}
        {edit && (
          <div className="profile__error-block">
            <button
              disabled={buttonDisabled}
              className={`profile__button ${
                buttonDisabled ? 'profile__button_disabled' : ''
              }`}
              type="submit"
              onClick={handleSubmitProfile}
            >
              Сохранить
            </button>
          </div>
        )}
        {props.setSuccessful ? (
          <div>
            <p className={`success ${userSuccess ? 'success-invis' : ''}`}>
              Успешно!
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}

export default ProfileBlock;

import { NavLink } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

import './ProfileBlock.css';

function ProfileBlock(props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ mode: 'onChange' });

  const [edit, setEdit] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const { currentUser } = useContext(CurrentUserContext);

  function error() {
    if (localStorage.getItem('error') === null) {
      const locNull = '';
      return locNull;
    }
    const locNeNull = `${localStorage.getItem('error')}`;
    return locNeNull;
  }

  useEffect(() => {}, [props.errorMessage]);

  useEffect(() => {
    setUserName('');
    setUserEmail('');
    if (localStorage.getItem('error') !== null) {
      setDisabled(true);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.removeItem('error');
  }, [userName, userEmail]);

  const handleEdit = () => {
    setEdit(!edit);
    setDisabledInputs(!disabledInputs);
  };

  function handleChangeName(e) {
    setDisabled(false);
    setUserName(e.target.value);
  }

  function handleChangeEmail(e) {
    setDisabled(false);
    setUserEmail(e.target.value);
  }

  function handleSubmitProfile() {
    props.onUpdateUser({
      name: userName,
      email: userEmail || currentUser.email,
    });
    setDisabled(true);
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
                <input
                  type="text"
                  className="profile__input"
                  placeholder="Имя"
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
                  })}
                  value={userName}
                  onChange={handleChangeName}
                />
                <p
                  className={`profile__paragraph ${
                    !disabledInputs && 'profile__paragraph_invis'
                  }`}
                >
                  {currentUser.name}
                </p>
                <div className="popup-input-error">
                  {errors?.email && (
                    <p>{errors?.email?.message || 'Произошла ошибка!'}</p>
                  )}
                </div>
              </div>
              <div className="profile__inputs-style">
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
                  })}
                  value={userEmail}
                  onChange={handleChangeEmail}
                />
                <p
                  className={`profile__paragraph ${
                    !disabledInputs && 'profile__paragraph_invis'
                  }`}
                >
                  {currentUser.email}
                </p>
                <div className="popup-input-error">
                  {errors?.email && (
                    <p>{errors?.email?.message || 'Произошла ошибка!'}</p>
                  )}
                </div>
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
                to="/signin"
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
              disabled={disabled}
              className={`profile__button ${
                disabled === true ? 'profile__button_disabled' : ''
              }`}
              type="submit"
              onClick={handleSubmitProfile}
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfileBlock;

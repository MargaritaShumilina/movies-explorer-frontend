import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import './ProfileBlock.css';

function ProfileBlock(props) {
  const [edit, setEdit] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleError = () => {
    setIsButton(!isButton);
    setDisabled(!disabled);
  };
  console.log(isButton);
  return (
    <section className="profile">
      <div className="profile__block">
        <h1 className="profile__title">Привет, {props.userName}!</h1>
        <div className="profile__form-block">
          <form className="profile__form">
            <fieldset className="profile__inputs">
              <div className="profile__inputs-style">
                <input
                  type="text"
                  className="profile__input"
                  placeholder="Имя"
                  required
                  id="form-profile-name"
                  maxLength="40"
                  minLength="5"
                />
                <p className="profile__paragraph">Виталий</p>
              </div>
              <div className="profile__inputs-style">
                <input
                  type="email"
                  className="profile__input"
                  placeholder="E-mail"
                  required
                  id="form-profile-email"
                  maxLength="40"
                  minLength="5"
                />
                <p className="profile__paragraph">pochta@yandex.ru</p>
              </div>
            </fieldset>
          </form>
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
              <NavLink to="/signin" className="profile__link main-link-style">
                Выйти из аккаунта
              </NavLink>
            </div>
          </>
        )}
        {edit && (
          <div className="profile__error-block">
            <p
              className={`profile__error_invisible ${
                isButton ? 'profile__error' : ''
              }`}
            >
              При обновлении профиля произошла ошибка.
            </p>
            <button
              className={`profile__button ${
                !isButton ? 'main-button-style' : ''
              } ${isButton ? 'profile__button_disabled' : ''}`}
              type="submit"
              onClick={handleError}
              disabled={disabled}
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

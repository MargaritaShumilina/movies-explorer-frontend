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
      <div className="profile_block">
        <h1 className="profile_title">Привет, {props.userName}!</h1>
        <div className="profile_form-block">
          <form className="profile_form">
            <fieldset className="profile_inputs">
              <div className="profile_inputs-style">
                <input
                  type="text"
                  className="profile_input"
                  placeholder="Имя"
                  required
                  id="form-profile-name"
                  maxLength="40"
                  minLength="5"
                />
                <p className="profile_paragraph">Виталий</p>
              </div>
              <div className="profile_inputs-style">
                <input
                  type="email"
                  className="profile_input"
                  placeholder="E-mail"
                  required
                  id="form-profile-email"
                  maxLength="40"
                  minLength="5"
                />
                <p className="profile_paragraph">pochta@yandex.ru</p>
              </div>
            </fieldset>
          </form>
        </div>
        {!edit && (
          <>
            <button
              className="profile_edit main-link-style"
              type="submit"
              onClick={handleEdit}
            >
              Редактировать
            </button>

            <div className="profile_link-container">
              <NavLink to="/signin" className="profile_link main-link-style">
                Выйти из аккаунта
              </NavLink>
            </div>
          </>
        )}
        {edit && (
          <div className="profile_error-block">
            <p
              className={`profile_error__invisible ${
                isButton ? 'profile_error' : ''
              }`}
            >
              При обновлении профиля произошла ошибка.
            </p>
            <button
              className={`profile_button ${
                !isButton ? 'main-button-style' : ''
              } ${isButton ? 'profile_button__disabled' : ''}`}
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

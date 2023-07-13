import { NavLink } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './ProfileBlock.css';

function ProfileBlock(props) {
  const [edit, setEdit] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setUserName('');
    setUserEmail('');
  }, [currentUser]);

  const handleEdit = () => {
    setEdit(!edit);
    setDisabledInputs(!disabledInputs);
  };

  const handleError = () => {
    setIsButton(!isButton);
    setDisabled(!disabled);
  };

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: userName,
      email: userEmail || currentUser.email,
    });
  }

  return (
    <section className="profile">
      <div className="profile__block">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__form-block">
          <form className="profile__form">
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
              onClick={handleSubmit}
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

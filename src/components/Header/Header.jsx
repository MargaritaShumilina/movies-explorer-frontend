import '../Header/Header.css';
import Logo from '../../images/logo.svg';
import Icon from '../../images/ac-icon.svg';
import Menu from '../../images/menu.svg';
import CloseIcon from '../../images/close.svg';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
  const [isClick, setIsClick] = useState(false);
  const mobileNavigation = () => {
    setIsClick(!isClick);
  };

  return (
    <section className="header">
      {!props.matches && !props.loggedIn && (
        <>
          <NavLink to="/" className="main-link-style">
            <img className="logo header__logo" src={Logo} alt="main logo" />
          </NavLink>
          <nav className="header__navigation">
            <ul className="header__navigation-list">
              <li className="header__navigation-item">
                <NavLink to="/signup" className="main-link-style">
                  Регистрация
                </NavLink>
              </li>
              <li className="header__navigation-item button-style">
                <NavLink
                  to="/signin"
                  className="main-link-style link-button-style"
                >
                  Войти
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
      {!props.matches && props.loggedIn && (
        <>
          <NavLink to="/" className="main-link-style">
            <img
              className="header__logo header__logo_login"
              src={Logo}
              alt="main logo"
            />
          </NavLink>
          <nav className="header__navigation-login">
            <ul className="header__navigation-list header__navigation-list_login">
              <li className="header__navigation-item header__navigation-item_login">
                <NavLink
                  to="/movies"
                  className="header__navigation-item-link main-link-style"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="header__navigation-item header__navigation-item_login">
                <NavLink
                  to="/saved-movies"
                  className="header__navigation-item-link main-link-style"
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
              <li className="header__navigation-item header__navigation-item_login header__navigation-item_last-login">
                <NavLink
                  to="/profile"
                  className="header__navigation-item-link main-link-style"
                >
                  Аккаунт
                </NavLink>
              </li>
              <img
                className="profile-page-icon"
                src={Icon}
                alt="Иконка аккаунта"
              />
            </ul>
          </nav>
        </>
      )}

      {props.matches && props.loggedIn && (
        <>
          <NavLink to="/" className="main-link-style">
            <img
              className="header__logo header__logo_login"
              src={Logo}
              alt="main logo"
            />
          </NavLink>
          <button className="header__menu" type="button">
            <img
              className={`header__menu-burger ${
                isClick && 'header__menu-burger_opened'
              }`}
              src={Menu}
              alt="menu logo"
              onClick={mobileNavigation}
            />
          </button>
          {isClick && (
            <div className="header__mobile">
              <img
                src={CloseIcon}
                alt="Закрывающая иконка"
                onClick={mobileNavigation}
                className="header__mobile-navigation-icon"
              />
              <nav className="header__mobile-navigation">
                <ul className="header__mobile-navigation-list header__mobile-navigation-list_login">
                  <div className="header__mobile-navigation-page">
                    <li className="header__mobile-navigation-item">
                      <NavLink
                        to="/"
                        className="header__mobile-navigation-link main-link-style"
                      >
                        Главная
                      </NavLink>
                    </li>

                    <li className="header__mobile-navigation-item">
                      <NavLink
                        to="/movies"
                        className="header__mobile-navigation-link main-link-style"
                      >
                        Фильмы
                      </NavLink>
                    </li>

                    <li className="header__mobile-navigation-item header__mobile-navigation-last-item-menu">
                      <NavLink
                        to="/saved-movies"
                        className="header__mobile-navigation-link main-link-style"
                      >
                        Сохраненные фильмы
                      </NavLink>
                    </li>
                  </div>
                  <div className="header__mobile-navigation-profile">
                    <NavLink
                      to="/profile"
                      className="header__mobile-navigation-link main-link-style"
                    >
                      <li className="header__mobile-navigation-item header__mobile-navigation-item_last">
                        Аккаунт
                      </li>
                    </NavLink>
                    <img
                      className="profile-page-icon"
                      src={Icon}
                      alt="Иконка аккаунта"
                    />
                  </div>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Header;

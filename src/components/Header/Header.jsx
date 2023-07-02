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
      {!props.login && (
        <>
          <NavLink to="/" className="main-link-style">
            <img
              className="logo header_logo"
              src={Logo}
              alt="main logo"
            />
          </NavLink>
          <nav className="header_navigation">
            <ul className="header_navigation-list">
              <li className="header_navigation-item">
                <NavLink to="/signup" className="main-link-style">
                  Регистрация
                </NavLink>
              </li>
              <li className="header_navigation-item button-style">
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
      {!props.matches && props.login && (
        <>
          <NavLink to="/" className="main-link-style">
            <img
              className="header_logo header_logo__login"
              src={Logo}
              alt="main logo"
            />
          </NavLink>
          <nav className="header_navigation__login">
            <ul className="header_navigation-list header_navigation-list__login">
              <li className="header_navigation-item header_navigation-item__login">
                <NavLink
                  to="/movies"
                  className="header_navigation-item-link main-link-style"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="header_navigation-item header_navigation-item__login">
                <NavLink
                  to="/saved-movies"
                  className="header_navigation-item-link main-link-style"
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
              <li className="header_navigation-item header_navigation-item__login header_navigation-item__last-login">
                <NavLink
                  to="/profile"
                  className="header_navigation-item-link main-link-style"
                >
                  Аккаунт
                </NavLink>
              </li>
              <img
                className="profile-page_icon"
                src={Icon}
                alt="Иконка аккаунта"
              />
            </ul>
          </nav>
        </>
      )}

      {props.matches && props.login && (
        <>
          <NavLink to="/" className="main-link-style">
            <img
              className="header_logo header_logo__login"
              src={Logo}
              alt="main logo"
            />
          </NavLink>
          <button className="header_menu" type="button">
            <img
              className={`header_menu-burger ${
                isClick && 'header_menu-burger__opened'
              }`}
              src={Menu}
              alt="menu logo"
              onClick={mobileNavigation}
            />
          </button>
          {isClick && (
            <div className="header_mobile">
              <img
                src={CloseIcon}
                alt="Закрывающая иконка"
                onClick={mobileNavigation}
                className="header_mobile-navigation-icon"
              />
              <nav className="header_mobile-navigation">
                <ul className="header_mobile-navigation-list header_mobile-navigation-list__login">
                  <div className="header_mobile-navigation-page">
                    <li className="header_mobile-navigation-item">
                      <NavLink
                        to="/"
                        className="header_mobile-navigation-link main-link-style"
                      >
                        Главная
                      </NavLink>
                    </li>

                    <li className="header_mobile-navigation-item">
                      <NavLink
                        to="/movies"
                        className="header_mobile-navigation-link main-link-style"
                      >
                        Фильмы
                      </NavLink>
                    </li>

                    <li className="header_mobile-navigation-item header_mobile-navigation-last-item-menu">
                      <NavLink
                        to="/saved-movies"
                        className="header_mobile-navigation-link main-link-style"
                      >
                        Сохраненные фильмы
                      </NavLink>
                    </li>
                  </div>
                  <div className="header_mobile-navigation-profile">
                    <NavLink
                      to="/profile"
                      className="header_mobile-navigation-link main-link-style"
                    >
                      <li className="header_mobile-navigation-item header_mobile-navigation-item__last">
                        Аккаунт
                      </li>
                    </NavLink>
                    <img
                      className="profile-page_icon"
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

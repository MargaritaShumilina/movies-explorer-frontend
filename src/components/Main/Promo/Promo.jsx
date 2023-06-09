import praktikum from '../../../images/praktikum.svg';
import './Promo.css';

function Promo() {
  return (
    <>
      <section className="banner">
        <div className="banner__title-container">
          <h1
            className="banner__title"
            style={{ backgroundImage: `url(${praktikum})` }}
          >
            Учебный проект студента факультета Веб-разработки.
          </h1>
        </div>
      </section>
      <nav className="main-navigation">
        <ul className="main-navigation__list">
          <li className="main-navigation__item">
            <a
              href="#about-project"
              className="main-link-style link-button-style"
            >
              О проекте
            </a>
          </li>
          <li className="main-navigation__item">
            <a href="#techs" className="main-link-style link-button-style">
              Технологии
            </a>
          </li>
          <li className="main-navigation__item">
            <a href="#about-me" className="main-link-style link-button-style">
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Promo;

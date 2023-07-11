import '../AboutProject/AboutProject.css';
import './AboutMe.css';
import PortfolioImage from '../../../images/portfolio-img.jpg';
import ArrowIcon from '../../../images/arrow-icon.svg';

function AboutMe() {
  return (
    <section className="portfolio-block">
      <h2 className="title-of-section">
        <a name="about-me">Студент</a>
      </h2>
      <div className="about-me">
        <div className="about-me__photo">
          <img
            src={PortfolioImage}
            alt="Фотография для портфолио"
            className="about-me__img"
          />
        </div>
        <div className="about-me__information">
          <h3 className="about-me__title">Маргарита</h3>
          <h4 className="about-me__subtitle">Фронтенд-разработчик, 27 лет</h4>
          <p className="about-me__description">
            Я родилась и живу в Санкт-Петербурге, закончила факультет спортивной
            журналистики в НГУ им.Лесгафта. У меня есть муж и сын. Я люблю
            слушать музыку, а ещё увлекаюсь греблей. С 2016 года работала в SEO.
            В данный момен прохожу переквалификацию во Фронтенд-разработчика.
          </p>
          <p className="about-me__portfolio">
            <a
              href="https://github.com/MargaritaShumilina/"
              target="__blank"
              rel="noreferrer"
              className="about-me__link main-link-style"
            >
              Github
            </a>
          </p>
        </div>
      </div>
      <div className="portfolio">
        <h5 className="portfolio__title">Портфолио</h5>
        <nav className="portfolio__navigation">
          <ul className="portfolio__list">
            <a
              href="https://margaritashumilina.github.io/how-to-learn/"
              target="__blank"
              rel="noreferrer"
              className="portfolio__link main-link-style"
            >
              <li className="portfolio__item">
                <span>Статичный сайт</span>

                <span>
                  <img
                    src={ArrowIcon}
                    alt="Ссылка на статичный сайт"
                    className="portfolio__arrow"
                  />
                </span>
              </li>
            </a>
            <a
              href="https://margaritashumilina.github.io/russian-travel/"
              target="__blank"
              rel="noreferrer"
              className="portfolio__link main-link-style"
            >
              <li className="portfolio__item">
                <span>Адаптивный сайт</span>

                <span>
                  <img
                    src={ArrowIcon}
                    alt="Ссылка на адаптивный сайт"
                    className="portfolio__arrow"
                  />
                </span>
              </li>
            </a>
            <a
              href="https://margarita.nomoredomains.rocks/signin"
              target="__blank"
              rel="noreferrer"
              className="portfolio__link main-link-style"
            >
              <li className="portfolio__item">
                <span>Одностраничное приложение</span>

                <span>
                  <img
                    src={ArrowIcon}
                    alt="Ссылка на одностраничное приложение"
                    className="portfolio__arrow"
                  />
                </span>
              </li>
            </a>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default AboutMe;

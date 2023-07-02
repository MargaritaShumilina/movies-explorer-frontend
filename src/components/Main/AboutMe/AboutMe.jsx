import '../AboutProject/AboutProject.css';
import './AboutMe.css';
import PortfolioImage from '../../../images/portfolio-img.jpg';
import ArrowIcon from '../../../images/arrow-icon.svg';

function AboutMe() {
  return (
    <section className="portfolio-block">
      <h2 className="about-project_title">
        <a name="about-me">Студент</a>
      </h2>
      <div className="about-me">
        <div className="about-me_photo">
          <img
            src={PortfolioImage}
            alt="Фотография для портфолио"
            className="about-me_img"
          />
        </div>
        <div className="about-me_information">
          <h3 className="about-me_title">Маргарита</h3>
          <h4 className="about-me_subtitle">Фронтенд-разработчик, 27 лет</h4>
          <p className="about-me_description">
            Я родилась и живу в Санкт-Петербурге, закончила факультет спортивной
            журналистики в НГУ им.Лесгафта. У меня есть муж и сын. Я люблю
            слушать музыку, а ещё увлекаюсь греблей. С 2016 года работала в SEO.
            В данный момен прохожу переквалификацию во Фронтенд-разработчика.
          </p>
          <p className="about-me_portfolio">
            <a
              href="https://github.com/MargaritaShumilina/"
              target="_blank"
              rel="noreferrer"
              className="about-me_link main-link-style"
            >
              Github
            </a>
          </p>
        </div>
      </div>
      <div className="portfolio">
        <h5 className="portfolio_title">Портфолио</h5>
        <nav className="portfolio_navigation">
          <ul className="portfolio_list">
            <li className="portfolio_item">
              <a
                href="https://margaritashumilina.github.io/how-to-learn/"
                target="_blank"
                rel="noreferrer"
                className="portfolio_link main-link-style"
              >
                <span>Статичный сайт</span>
              </a>
              <span>
                <img
                  src={ArrowIcon}
                  alt="Ссылка на статичный сайт"
                  className="portfolio_arrow"
                />
              </span>
            </li>
            <li className="portfolio_item">
              <a
                href="https://margaritashumilina.github.io/russian-travel/"
                target="_blank"
                rel="noreferrer"
                className="portfolio_link main-link-style"
              >
                <span>Адаптивный сайт</span>
              </a>
              <span>
                <img
                  src={ArrowIcon}
                  alt="Ссылка на адаптивный сайт"
                  className="portfolio_arrow"
                />
              </span>
            </li>
            <li className="portfolio_item">
              <a
                href="https://margarita.nomoredomains.rocks/signin"
                target="_blank"
                rel="noreferrer"
                className="portfolio_link main-link-style"
              >
                <span>Одностраничное приложение</span>
              </a>
              <span>
                <img
                  src={ArrowIcon}
                  alt="Ссылка на одностраничное приложение"
                  className="portfolio_arrow"
                />
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default AboutMe;

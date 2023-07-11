import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__label">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copywrite">&copy; 2023</p>
        <nav className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com/"
                target="__blank"
                rel="noreferrer"
                className="footer__link main-link-style"
              >
                Github
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://practicum.yandex.ru/"
                target="__blank"
                rel="noreferrer"
                className="footer__link main-link-style"
              >
                Яндекс.Практикум
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

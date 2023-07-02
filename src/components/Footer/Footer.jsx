import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer_label">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer_container">
        <p className="footer_copywrite">&copy; 2023</p>
        <nav className="footer_navigation">
          <ul className="footer_list">
            <li className="footer_item">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footer_link main-link-style"
              >
                Github
              </a>
            </li>
            <li className="footer_item">
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer_link main-link-style"
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

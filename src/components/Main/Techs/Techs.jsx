import './Techs.css';
import '../AboutProject/AboutProject.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className="title-of-section">
        <a name="techs">Технологии</a>
      </h2>
      <div className="about-techs">
        <h3 className="about-techs__title">7 технологий</h3>
        <p className="about-techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="using-techs">
          <ul className="using-techs__list">
            <li className="using-techs__item">HTML</li>
            <li className="using-techs__item">CSS</li>
            <li className="using-techs__item">JS</li>
            <li className="using-techs__item">React</li>
            <li className="using-techs__item">Git</li>
            <li className="using-techs__item">Express.js</li>
            <li className="using-techs__item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;

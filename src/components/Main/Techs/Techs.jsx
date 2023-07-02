import './Techs.css';
import '../AboutProject/AboutProject.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className="about-project_title">
        <a name="techs">Технологии</a>
      </h2>
      <div className="about-techs">
        <h3 className="about-techs_title">7 технологий</h3>
        <p className="about-techs_description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="using-techs">
          <ul className="using-techs_list">
            <li className="using-techs_item">HTML</li>
            <li className="using-techs_item">CSS</li>
            <li className="using-techs_item">JS</li>
            <li className="using-techs_item">React</li>
            <li className="using-techs_item">Git</li>
            <li className="using-techs_item">Express.js</li>
            <li className="using-techs_item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;

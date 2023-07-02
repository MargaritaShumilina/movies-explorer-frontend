import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project_block">
        <h2 className="about-project_title">
          <a name="about-project">О проекте</a>
        </h2>
        <div className="about-project_description">
          <article className="project">
            <h3 className="project_title">Дипломный проект включал 5 этапов</h3>
            <p className="project_description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </article>
          <article className="project">
            <h3 className="project_title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project_description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </div>
        <div className="project-diagram">
          <div className="project-diagram_weeks">
            <p className="project-diagram_paragraph project-diagram_weeks__back-end">
              1 неделя
            </p>
          </div>
          <div className="project-diagram_weeks">
            <p className="project-diagram_paragraph project-diagram_weeks__front-end">
              4 недели
            </p>
          </div>
          <div className="project-diagram_weeks">
            <p className="project-diagram_name">Back-end</p>
          </div>
          <div className="project-diagram_weeks">
            <p className="project-diagram_name">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

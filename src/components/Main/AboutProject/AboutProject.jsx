import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__block">
        <h2 className="title-of-section">
          <a name="about-project">О проекте</a>
        </h2>
        <div className="about-project__description">
          <article className="project">
            <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
            <p className="project__description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </article>
          <article className="project">
            <h3 className="project__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </div>
        <div className="project-diagram">
          <div className="project-diagram__weeks">
            <p className="project-diagram__paragraph project-diagram__back-end">
              1 неделя
            </p>
          </div>
          <div className="project-diagram__weeks">
            <p className="project-diagram__paragraph project-diagram__front-end">
              4 недели
            </p>
          </div>
          <div className="project-diagram__weeks">
            <p className="project-diagram__name">Back-end</p>
          </div>
          <div className="project-diagram__weeks">
            <p className="project-diagram__name">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

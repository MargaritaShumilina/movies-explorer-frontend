import './NoPageBlock.css';
import { NavLink } from 'react-router-dom';

function NoPageBlock() {
  return (
    <section className="not-found">
      <p className="not-found_status">404</p>
      <p className="not-found_description">Страница не найдена</p>
      <NavLink to="/" className="not-found_navigate-link main-link-style">
        Назад
      </NavLink>
    </section>
  );
}

export default NoPageBlock;

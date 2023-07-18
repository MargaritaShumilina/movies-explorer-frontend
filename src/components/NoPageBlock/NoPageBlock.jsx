import './NoPageBlock.css';
import { useNavigate } from 'react-router-dom';

function NoPageBlock() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <section className="not-found">
      <p className="not-found__status">404</p>
      <p className="not-found__description">Страница не найдена</p>
      <button
        onClick={goBack}
        className="not-found__navigate-link main-link-style invisible-button"
      >
        Назад
      </button>
    </section>
  );
}

export default NoPageBlock;

import './MoreBtn.css';

function MoreBtn(props) {
  return (
    <div className="movie-button-block">
      <button
        className="movie-button-block__more"
        onClick={props.incrementPage}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoreBtn;

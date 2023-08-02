import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import '../Header/Header.css';

function Main(props) {
  return (
    <>
      <section className="main-page-header">
        <Header loggedIn={props.loggedIn} matches={props.matches} />
        <Promo />
      </section>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  );
}

export default Main;

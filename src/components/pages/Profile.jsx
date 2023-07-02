import Header from '../Header/Header';
import ProfileBlock from '../Profile/ProfileBlock';

function Profile(props) {
  return (
    <>
      <Header login={props.login} matches={props.matches} />
      <ProfileBlock userName={props.userName} />
    </>
  );
}

export default Profile;

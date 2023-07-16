import Header from '../Header/Header';
import ProfileBlock from '../Profile/ProfileBlock';

function Profile(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} matches={props.matches} />
      <ProfileBlock
        userName={props.userName}
        onUpdateUser={props.onUpdateUser}
        signOut={props.signOut}
        errorMessage={props.errorMessage}
      />
    </>
  );
}

export default Profile;

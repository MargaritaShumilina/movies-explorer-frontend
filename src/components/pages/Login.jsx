import LoginBlock from '../LoginBlock/LoginBlock';

function Login(props) {
  return (
    <LoginBlock
      handleLoginClick={props.handleLoginClick}
      errorMessage={props.errorMessage}
    />
  );
}

export default Login;

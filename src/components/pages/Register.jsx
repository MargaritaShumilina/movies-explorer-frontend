import RegisterBlock from '../RegisterBlock/RegisterBlock';

function Register(props) {
  return (
    <RegisterBlock
      handleRegistrationClick={props.handleRegistrationClick}
      errorMessage={props.errorMessage}
    />
  );
}

export default Register;

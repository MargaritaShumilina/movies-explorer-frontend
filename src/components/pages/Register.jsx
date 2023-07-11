import RegisterBlock from '../RegisterBlock/RegisterBlock';

function Register(props) {
  return (
    <RegisterBlock handleRegistrationClick={props.handleRegistrationClick} />
  );
}

export default Register;

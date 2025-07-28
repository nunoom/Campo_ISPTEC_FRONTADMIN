import Aurora from '../Backgrounds/Aurora/Aurora';
import Form from './Login'; 

import "./Login_Aurora.css"

const LogIn = () => {
  return (
    <div className="login-wrapper">
      <Aurora
        amplitude={1.2}
        blend={0.4}
        colorStops={["#F1C40F", "#F1C40F", "#F1C40F"]}
      />
      <Form />
    </div>
  );
};

export default LogIn;
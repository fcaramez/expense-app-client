import { SignUp } from "../components/Signup";
import {Login} from "../components/Login";
import { useState } from "react";

function Auth() {
  const [signUp, setSignup] = useState(true);
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const openLogin = () => {
    setLogin(true);
    setSignup(false);
  };

  const openSignup = () => {
    setSignup(true);
    setLogin(false);
  };
  return (
    <>
      {signUp && (
        <SignUp
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          openLogin={openLogin}
        />
      )}

      {login && (
        <Login
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          openSignup={openSignup}
        />
      )}
    </>
  );
}

export default Auth;

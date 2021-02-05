import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

import { getToken } from "../../store/actionCreators";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const login = async (googleData: any) => {
    dispatch(getToken(googleData.tokenId));
  };
  return (
    <GoogleLogin
      clientId="952878566528-kd5v9b20g4mqrafl8bku1f11k312c5rm.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={login}
      onFailure={(d) => console.log("error", d)}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default Login;

import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import UserService from "./service/userService";
import config from "./configs/config";

/**
 * Handles redirections according to the app's state and the user's session.
 */
export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const service = new UserService();
    if (config.accessJwt) navigate('/home');
    else {
      // try to refresh token. will succeed if the user has the refreshJwt cookie
      service.refreshToken({
        then: r => {
          config.accessJwt = r.data as string;
          navigate('/home');
        },
        catchEx: r => {
          console.log(r);
          if (r.response.status === 403) alert('your session expired');
          navigate('/register');
        }
      });
    }
  });
  return <p>Redirecting...</p>;
}
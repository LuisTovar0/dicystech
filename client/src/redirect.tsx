import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import UserService from "./service/userService";
import config from "./configs/config";
import {AppState} from "./components/App";

/**
 * Handles redirections according to the app's state and the user's session.
 */
export default function Redirect({topInfoState}: { topInfoState: AppState }) {
  const navigate = useNavigate();
  useEffect(() => {
    const service = new UserService();
    if (config.accessJwt)
      navigate('/' + config.routes.home);
    else {
      // try to refresh token. will succeed if the user has the refreshJwt cookie
      service.refreshToken({
        then: r => {
          config.accessJwt = r.data as string;
          navigate('/' + config.routes.home);
        },
        catchEx: r => {
          console.log(r);
          if (r.response.status === 403) alert('your session expired');
          navigate('/' + config.routes.createAccount);
        }
      });
    }
  });

  const [topInfo, setTopInfo] = topInfoState;
  if (!topInfo.loading)
    setTopInfo({...topInfo, loading: true});

  return <div style={{display: "grid", placeItems: "center", minHeight: '70vh'}}/>;
}
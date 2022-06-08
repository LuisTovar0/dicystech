import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from "crypto-js";
import './auth.css';

import UserService from "../../service/userService";
import AuthForm, {FieldInfo} from "./AuthForm";
import {AppInfoSetter} from "../app/App";
import config from "../../configs/config";

export function Login({topInfoState}: { topInfoState: AppInfoSetter }) {
  const navigate = useNavigate();
  const fieldNames = ['email', 'password'];

  const login = (fields: FieldInfo[], setMessage: Dispatch<SetStateAction<string>>) => {
    const infos = fields.map(field => field.input[0]);

    const password = infos[1];
    const encryptedPassword = crypto.SHA256(password).toString();
    const service = new UserService();
    service.login(infos[0], encryptedPassword,
      {
        then: r => {
          config.accessJwt = r.data as string;
          navigate('/home');
        },
        catchEx: ({response}) => {
          setMessage([404, 401].indexOf(response.status) != -1
            ? `Those credentials don't match.`
            : `Unexpected error: ${response.data}`);
        }
      });
  };

  return (
    <AuthForm topInfoState={topInfoState} formName={'Login'} fieldNames={fieldNames}
              alternativeButton={{navigate: '/register', description: 'Register instead'}} onClick={login}/>
  );
}

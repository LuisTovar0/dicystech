import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from "crypto-js";
import './auth.css';

import {FieldInfo} from "./Fields";
import UserService from "../../service/userService";
import AuthenticationResult from "../../dto/authenticationResult";
import AuthForm from "./AuthForm";
import {AppComponentProps} from "../app/App";

export function Login({setPageName}: AppComponentProps) {
  const navigate = useNavigate();

  const login = (fields: FieldInfo[], setMessage: Dispatch<SetStateAction<string>>) => {
    const infos = fields.map(field => field.input[0]);

    const password = infos[1];
    const encryptedPassword = crypto.SHA256(password).toString();
    const service = new UserService();
    service.login(infos[1], encryptedPassword,
      {
        then: r => {
          if (r.data as AuthenticationResult) {
            navigate('/home');
          } else {
            setMessage(`Unexpected response format from the server.`);
            console.log(r.data);
          }
        },
        catchEx: r => setMessage(`Unexpected error: ${r}`)
      });
  };

  return (
    <AuthForm setPageName={setPageName} formName={'Login'} fieldNames={['email', 'password']}
              alternativeButton={{navigate: '/register', description: 'Register instead'}} onClick={login}/>
  );
}

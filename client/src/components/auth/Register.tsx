import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from 'crypto-js';
import './auth.css';

import UserService from "../../service/userService";
import {FieldInfo} from "./Fields";
import UserHiddenPwd from "../../dto/userHiddenPwd";
import AuthForm from "./AuthForm";
import {AppComponentProps} from "../app/App";

export function Register({setPageName}: AppComponentProps) {
  const navigate = useNavigate();

  function register(fields: FieldInfo[], setMessage: Dispatch<SetStateAction<string>>) {
    const infos = fields.map(field => field.input[0]);

    const password = infos[1];

    // 8 characters length
    // 2 letters in Upper Case
    // 1 Special Character (!@#$&*)
    // 2 numerals (0-9)
    // 3 letters in Lower Case
    // if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d)(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(password))
    //   console.log('unsafe password')

    const service = new UserService();
    service.register({email: infos[0], password: crypto.SHA256(password).toString()},
      {
        then: r => {
          if (r.data as UserHiddenPwd) {
            navigate('/home');
          } else setMessage(`Internal error: infrastructure didn't return correct format.`);
        },
        catchEx: r => setMessage(String(r))
      }
    );
  }

  return (
    <AuthForm formName={'Register'} fieldNames={['email', 'password']} setPageName={setPageName}
              alternativeButton={{navigate: '/login', description: 'Log in instead'}} onClick={register}/>
  );
}

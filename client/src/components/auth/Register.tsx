import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from 'crypto-js';
import './auth.css';

import UserService from "../../service/userService";
import AuthForm, {FieldInfo} from "./AuthForm";
import {AppInfoSetter} from "../app/App";
import config from "../../configs/config";

export function Register({topInfoState}: { topInfoState: AppInfoSetter }) {
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
          console.log(r);
          config.accessJwt = r.data.accessJwt as string;
          navigate('/');
        },
        catchEx: r => setMessage(String(r))
      }
    );
  }

  return (
    <AuthForm formName={'Register'} fieldNames={['email', 'password']} topInfoState={topInfoState}
              alternativeButton={{navigate: '/login', description: 'Log in instead'}} onClick={register}/>
  );
}

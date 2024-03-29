import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from "crypto-js";
import {TextField} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import UserService from "../../service/userService";
import AuthForm, {FieldInfo, fieldInfos, onInput} from "./AuthForm";
import {AppStateProps} from "../App";
import config from "../../config";
import {formInputStyle} from "../../styles/authFormStyles";

export interface LoginFieldInfoMap {
  email: FieldInfo,
  password: FieldInfo
}

export function Login({topInfoState}: AppStateProps) {
  const navigate = useNavigate();
  const fields = fieldInfos({email: 'E-mail', password: 'Password'}) as unknown as LoginFieldInfoMap;

  function login(setMessage: Dispatch<SetStateAction<string>>) {
    const password = fields.password.value;
    const encryptedPassword = crypto.SHA256(password).toString();
    const service = new UserService(); // while dependency injection isn't yet configured
    service.login(fields.email.value, encryptedPassword,
      {
        then: r => {
          config.accessJwt = r.data as string;
          navigate('/' + config.routes.home);
        },
        catchEx: ({response}) => {
          setMessage(404 === response.status || 401 === response.status
            ? `Those credentials don't match.`
            : `Unexpected error: ${response.data}`);
        }
      });
  }

  return (
    <AuthForm
      topInfoState={topInfoState} formName={'Log In'} onClick={login}
      alternativeOpt={{route: '/createAccount', description: 'Create Account', icon: <PersonAddAltIcon/>}}
      form={<>
        <TextField
          style={formInputStyle}
          variant="standard"
          label="E-mail"
          value={fields.email.value}
          onInput={event => onInput(event, fields.email)}
        />
        <TextField
          style={formInputStyle}
          variant="standard"
          label="Password"
          type="password"
          value={fields.password.value}
          onInput={event => onInput(event, fields.password)}
        />
      </>}/>
  );
}

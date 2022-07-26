import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from "crypto-js";
import {TextField} from "@mui/material";

import UserService from "../../service/userService";
import AuthForm, {fieldInfos, onInput} from "./AuthForm";
import {AppInfoSetter} from "../App";
import config from "../../configs/config";

export function Login({topInfoState}: { topInfoState: AppInfoSetter }) {
  const navigate = useNavigate();
  const fields = fieldInfos(['E-mail', 'Password']);

  function login(setMessage: Dispatch<SetStateAction<string>>) {
    const infos = fields.map(field => field.value);

    const password = infos[1];
    const encryptedPassword = crypto.SHA256(password).toString();
    const service = new UserService(); // while dependency injection isn't yet configured
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
  }

  return (
    <AuthForm topInfoState={topInfoState} formName={'Log In'} onClick={login}
              alternativeOpt={{route: '/createAccount', description: 'Create Account'}}
              form={<>
                <TextField
                  style={{paddingTop: 10, paddingBottom: 10}}
                  variant="filled"
                  label="E-mail"
                  value={fields[0].value}
                  onInput={event => onInput(event, fields[0])}
                > </TextField>
                <TextField
                  style={{paddingTop: 10, paddingBottom: 10}}
                  variant="filled"
                  label="Password"
                  type="password"
                  value={fields[1].value}
                  onInput={event => onInput(event, fields[1])}
                ></TextField>
              </>}/>
  );
}

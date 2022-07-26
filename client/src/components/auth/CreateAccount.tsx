import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from 'crypto-js';

import UserService from "../../service/userService";
import AuthForm, {fieldInfos, onInput} from "./AuthForm";
import {AppInfoSetter} from "../App";
import config from "../../configs/config";
import {TextField} from "@mui/material";

export function CreateAccount({topInfoState}: { topInfoState: AppInfoSetter }) {
  const navigate = useNavigate();
  const fields = fieldInfos(['E-mail', 'Password',]);

  function register(setMessage: Dispatch<SetStateAction<string>>) {
    const infos = fields.map(field => field.value);
    console.log(infos);

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
          config.accessJwt = r.data as string;
          navigate('/');
        },
        catchEx: r => setMessage(String(r))
      }
    );
  }

  return (
    <AuthForm formName={'Create Account'} topInfoState={topInfoState} onClick={register}
              alternativeOpt={{route: '/login', description: 'Log In'}}
              form={<>
                <TextField
                  style={{paddingTop: 10, paddingBottom: 10}}
                  variant="filled"
                  label="E-mail"
                  value={fields[0].value}
                  onInput={event => onInput(event, fields[0])}
                ></TextField>
                <TextField
                  style={{paddingTop: 10, paddingBottom: 10}}
                  variant="filled"
                  label="Password"
                  type="password"
                  value={fields[1].value}
                  onInput={event => onInput(event, fields[1])}
                ></TextField>
              </>}
    />
  );
}

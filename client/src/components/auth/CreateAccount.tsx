import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import crypto from 'crypto-js';

import UserService from "../../service/userService";
import AuthForm, {fieldInfos, onInput} from "./AuthForm";
import {AppInfoSetter} from "../App";
import config from "../../configs/config";
import {TextField} from "@mui/material";
import {formInputStyle} from "../../styles/authFormStyles";
import {LoginFieldInfoMap} from "./Login";

interface CreateAccountFieldInfoMap extends LoginFieldInfoMap {
}

export function CreateAccount({topInfoState}: { topInfoState: AppInfoSetter }) {
  const navigate = useNavigate();
  const fields = fieldInfos({email: 'E-mail', password: 'Password'}) as unknown as CreateAccountFieldInfoMap;

  function register(setMessage: Dispatch<SetStateAction<string>>) {
    const password = fields.password.value;

    // 8 characters length
    // 2 letters in Upper Case
    // 1 Special Character (!@#$&*)
    // 2 numerals (0-9)
    // 3 letters in Lower Case
    // if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d)(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(password))
    //   console.log('unsafe password')

    const service = new UserService();
    service.register({email: fields.email.value, password: crypto.SHA256(password).toString()},
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
                  style={formInputStyle}
                  variant="standard"
                  label="E-mail"
                  value={fields.email.value}
                  onInput={event => onInput(event, fields.email)}
                ></TextField>
                <TextField
                  style={formInputStyle}
                  variant="standard"
                  label="Password"
                  type="password"
                  value={fields.password.value}
                  onInput={event => onInput(event, fields.password)}
                ></TextField>
              </>}
    />
  );
}

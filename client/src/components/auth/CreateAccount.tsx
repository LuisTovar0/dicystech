import React, {Dispatch, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import crypto from 'crypto-js';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import {Fade, IconButton, TextField, Tooltip} from "@mui/material";

import AuthForm, {fieldInfos, onInput} from "./AuthForm";
import {AppState} from "../App";
import config from "../../config";
import {formInputStyle} from "../../styles/authFormStyles";
import {LoginFieldInfoMap} from "./Login";
import dependencyInjector from "../../config/dependencyInjector";

interface CreateAccountFieldInfoMap extends LoginFieldInfoMap {
}

export function CreateAccount({topInfoState}: { topInfoState: AppState }) {
  const navigate = useNavigate();
  const fields = fieldInfos({email: 'E-mail', password: 'Password'}) as unknown as CreateAccountFieldInfoMap;

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
  const emailError = !emailRegex.test(fields.email.value);
  const pwdRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d)(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
  const pwdError = !pwdRegex.test(fields.password.value);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  function register(setMessage: Dispatch<SetStateAction<string>>) {
    setAttemptedSubmit(true);

    const email = fields.email.value;
    if (!emailRegex.test(email)) return;

    const password = fields.password.value;
    // if (!pwdRegex.test(password)) return;

    const service = dependencyInjector.userService;
    service.register({email: fields.email.value, password: crypto.SHA256(password).toString()},
      {
        then: r => {
          config.accessJwt = r.data as string;
          navigate('/');
        },
        catchEx: r => setMessage(`Error ${r.response.status}: ${r.response.data}`)
      }
    );
  }

  const tooltipText = "Must have at least 8 characters length, 2 upper case letters," +
    " 3 lower case letters, 1 special character and 2 numerals.";

  return (
    <AuthForm
      formName={'Create Account'} topInfoState={topInfoState} onClick={register}
      alternativeOpt={{route: '/login', description: 'Log In', icon: <LoginIcon/>}}
      form={<>
        <TextField
          style={formInputStyle} variant="standard" helperText={emailError && attemptedSubmit ? 'Invalid email.' : null}
          error={emailError && attemptedSubmit} label="E-mail" value={fields.email.value}
          onInput={event => onInput(event, fields.email)}
        ></TextField>
        <div style={formInputStyle}>
          <TextField
            variant="standard" label="Password" type="password" value={fields.password.value}
            error={pwdError && attemptedSubmit} onInput={event => onInput(event, fields.password)}
          ></TextField>
          <Tooltip title={tooltipText} arrow TransitionComponent={Fade}>
            <IconButton>
              <InfoIcon/>
            </IconButton>
          </Tooltip>
        </div>
      </>}
    />
  );
}

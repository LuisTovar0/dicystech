import {useNavigate} from "react-router-dom";
import React from "react";
import crypto from 'crypto-js';

import UserService from "../../service/userService";
import Fields, {fieldInfoBoilerplate} from "./Fields";
import UserHiddenPwd from "../../dto/userHiddenPwd";

export function Register() {
  const navigate = useNavigate();
  const fields = fieldInfoBoilerplate(['name', 'email', 'password',]);

  function register() {
    const infos = fields.map(field => field.input[0]);

    const password = infos[2];

    // 8 characters length
    // 2 letters in Upper Case
    // 1 Special Character (!@#$&*)
    // 2 numerals (0-9)
    // 3 letters in Lower Case
    // if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d)(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(password))
    //   console.log('unsafe password')

    const service = new UserService();
    service.register({email: infos[1], password: crypto.SHA256(password).toString()},
      {
        then: r => {
          if (r.data as UserHiddenPwd) {

          }
        },
        catchEx: r => console.log(r)
      }
    );
  }

  return (
    <div className="register">
      <h2>Register</h2>
      <Fields fields={fields}/>
      <button onClick={() => navigate('/login')}>Login instead</button>
      <button onClick={register}>Register</button>
    </div>
  );
}

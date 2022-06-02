import {useNavigate} from "react-router-dom";
import React from "react";

import Fields, {fieldInfoBoilerplate} from "./Fields";
import crypto from "crypto-js";
import UserService from "../../service/userService";
import UserHiddenPwd from "../../dto/userHiddenPwd";

export function Login() {
  const navigate = useNavigate();
  const fields = fieldInfoBoilerplate([`email`, `password`]);

  const login = () => {
    const infos = fields.map(field => field.input[0]);

    const password = infos[1];
    const encryptedPassword = crypto.SHA256(password).toString();
    const service = new UserService();
    service.register({email: infos[1], password: encryptedPassword},
      {
        then: r => {
          if (r.data as UserHiddenPwd) {
            console.log(r.data)
          }
        },
        catchEx: r => console.log(r)
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <Fields fields={fields}/>
      <button onClick={() => navigate('/register')}>Register instead</button>
      <button onClick={login}>Log In</button>
    </div>
  );
}

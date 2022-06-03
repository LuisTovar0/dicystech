import {useNavigate} from "react-router-dom";
import React, {Dispatch, SetStateAction, useState} from "react";

import Fields, {FieldInfo, fieldInfoBoilerplate} from "./Fields";
import {AppComponentProps} from "../app/App";

export interface FormProps extends AppComponentProps {
  formName: string,
  fieldNames: string[],
  alternativeButton: {
    navigate: string,
    description: string,
  },
  onClick: (fields: FieldInfo[], setMessage: Dispatch<SetStateAction<string>>) => void;
}

export default function AuthForm({setPageName, formName, fieldNames, alternativeButton, onClick}: FormProps) {
  setPageName(formName);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const fields = fieldInfoBoilerplate(fieldNames);

  return (
    <div className="authform">
      <Fields fields={fields}/>
      <button onClick={() => navigate(alternativeButton.navigate)}>{alternativeButton.description}</button>
      <button onClick={() => onClick(fields, setMessage)}>Log In</button>
      <label>{message}</label>
    </div>
  );
}


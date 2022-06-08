import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {AppInfoSetter} from "../app/App";

export type FieldInfo = { name: string, input: State }
export type State = [string, Dispatch<SetStateAction<string>>];

export interface FormProps {
  topInfoState: AppInfoSetter,
  formName: string,
  fieldNames: string[],
  alternativeButton: {
    navigate: string,
    description: string,
  },
  onClick: (fields: FieldInfo[], setMessage: Dispatch<SetStateAction<string>>) => void;
}

export default function AuthForm({topInfoState, formName, fieldNames, alternativeButton, onClick}: FormProps) {
  useEffect(() => {
    const newState = {
      pageName: formName,
      options: [
        <button key="auth-instead" onClick={() => navigate(alternativeButton.navigate)}>
          {alternativeButton.description}</button>
      ]
    };
    const [state, setState] = topInfoState;
    if (state.pageName !== newState.pageName) setState(newState);
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const fields = fieldNames.map(name => ({name, input: useState('')}));
  const rows = fields.map(({input, name}) => {
    const [inputValue, setInput] = input;
    return (
      <tr key={name}>
        <td align="left">{name}</td>
        <td><input id={name} type={name.includes('password') ? 'password' : ''} value={inputValue}
          //@ts-ignore
                   onInput={event => setInput(event.target.value)}/></td>
      </tr>
    );
  });

  return (
    <div className="authform">
      <table className="fields">
        <tbody>{rows}</tbody>
      </table>
      <button onClick={() => onClick(fields, setMessage)}>{formName}</button>
      <div className="message">{message}</div>
    </div>
  );
}


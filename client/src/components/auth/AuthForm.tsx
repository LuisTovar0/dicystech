import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {AppInfoSetter, AppTopLevelInfo} from "../App";
import Fields, {FieldInfo} from "../auxiliar/Fields";

export interface FormProps {
  topInfoState: AppInfoSetter,
  formName: string,
  fields: FieldInfo[],
  alternativeButton: {
    navigate: string,
    description: string,
  },
  onClick: (fields: FieldInfo[], setMessage: Dispatch<SetStateAction<string>>) => void;
}

export default function AuthForm({topInfoState, formName, fields, alternativeButton, onClick}: FormProps) {
  useEffect(() => {
    const newState = {
      pageName: formName,
      options: [{
        name: alternativeButton.description,
        handler: () => navigate(alternativeButton.navigate)
      }]
    } as AppTopLevelInfo;
    const [state, setState] = topInfoState;
    if (state.pageName !== newState.pageName) setState(newState);
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div className="authform">
      <Fields fields={fields}/>
      <button onClick={() => onClick(fields, setMessage)}>{formName}</button>
      <div className="message">{message}</div>
    </div>
  );
}


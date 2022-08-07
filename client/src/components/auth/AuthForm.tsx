import {useNavigate} from "react-router-dom";
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {Paper, Typography} from "@mui/material";
import Button from "@mui/material/Button";

import {AppInfoSetter, AppTopLevelInfo, Elem} from "../App";
import {componentStyle, formInputStyle, paperStyle} from "../../styles/authFormStyles";

export interface FormProps {
  topInfoState: AppInfoSetter,
  formName: string,
  form: Elem,
  alternativeOpt: {
    route: string,
    description: string,
  },
  onClick: (setMessage: Dispatch<SetStateAction<string>>) => void;
}

export interface FieldInfo {
  name: string,
  value: string,
  setter: Dispatch<SetStateAction<string>>
}

export interface FieldInfoMap {
  [k: string]: FieldInfo;
}

export const onInput = (event: FormEvent<HTMLDivElement>, field: FieldInfo) =>
  field.setter((event.target as HTMLInputElement).value);

/**
 * Due to the similarity between the CreateAccount component and the Login component, the AuthForm component exists to
 * reduce code duplication. It will update the top-level component information (page name and navbar options) and set up
 * the form UI and styles, which are the tasks that would be duplicated.
 *
 * @param topInfoState is needed to set the page name at the top-level component
 *
 * @param formName the form name: "Create Account" or "Log In"
 *
 * @param form the form content, for user inputs and such
 *
 * @param alternativeOpt if the user is at "Create Account", he has the option to navigate to "Log In", and vice-versa.
 * This option is applied to the top-level component, appearing at the navbar
 *
 * @param onClick the function that will be called at the button click.
 * In practice, it will be the "login" or "createAccount" function, because this is AuthForm.
 */
export default function AuthForm({topInfoState, formName, form, alternativeOpt, onClick}: FormProps) {
  useEffect(() => {
    const newState = {
      pageName: formName,
      options: [{
        name: alternativeOpt.description,
        handler: () => navigate(alternativeOpt.route)
      }]
    } as AppTopLevelInfo;
    const [state, setState] = topInfoState;
    if (state.pageName !== newState.pageName) setState(newState);
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div style={componentStyle}>
      <Paper style={paperStyle} elevation={3}>
        {form}
        <Button style={{...formInputStyle, marginTop: 20}} onClick={() => onClick(setMessage)}>{formName}</Button>
      </Paper>
      <Typography>{message}</Typography>
    </div>
  );
}

export function fieldInfos(names: { [a: string]: string }): FieldInfoMap {
  const ret: FieldInfoMap = {};
  Object.entries(names).forEach(([k, v]) => {
    const [value, setter] = useState('');
    ret[k] = {name: v, value, setter};
  });
  return ret;
}

import {useNavigate} from "react-router-dom";
import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {ListItemIcon, Paper, Typography} from "@mui/material";
import Button from "@mui/material/Button";

import {AppInfo, AppState, Elem} from "../App";
import {authFormStyle, errMessageStyle, formInputStyle, paperStyle} from "../../styles/authFormStyles";

export interface FormProps {
  topInfoState: AppState,
  formName: string,
  form: Elem,
  alternativeOpt: {
    route: string,
    description: string,
    icon?: Elem
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
  const newState = {
    pageName: formName,
    options: [{
      name: alternativeOpt.description,
      handler: () => navigate(alternativeOpt.route),
      icon: alternativeOpt.icon ? <ListItemIcon>{alternativeOpt.icon}</ListItemIcon> : undefined
    }]
  } as AppInfo;
  const [topInfo, setTopInfo] = topInfoState;
  if (topInfo.pageName !== newState.pageName)
    setTopInfo(newState);

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div style={authFormStyle}>
      <Paper style={paperStyle} elevation={3}>
        {form}
        <Button style={{...formInputStyle, marginTop: 20}} onClick={() => {
          // setTopInfo({...topInfo, loading: true});
          onClick(setMessage);
        }}>{formName}</Button>
      </Paper>
      <Typography style={errMessageStyle}>{message}</Typography>
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

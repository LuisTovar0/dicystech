import {NavigateFunction, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import config from "../../config";
import {AppInfo, AppStateProps, Elem, NavBarOption} from "../App";
import {ListItemIcon} from "@mui/material";

export interface BaseComponentProps extends AppStateProps {
  elem: Elem,
  pageName: string,
  options?: NavBarOption[],
}

// curried function: a function that returns a function so there's not the need to repeatedly declare the inner function
const option = (name: string, handler: (n: NavigateFunction) => void, iconParam?: Elem) => {
  return (navigate: NavigateFunction) => {
    let icon = iconParam ? <ListItemIcon>{iconParam}</ListItemIcon> : undefined;
    return ({name, handler: () => handler(navigate), icon} as NavBarOption);
  };
};
export const defaultOptions = {
  home: option("Home Page", navigate => navigate('/' + config.routes.home), <HomeIcon/>),
  addLab: option("Add Lab", navigate => navigate('/' + config.routes.addLab), <AddBusinessIcon/>),
  logOut: option("Log Out", navigate => {
    config.accessJwt = undefined;
    navigate('/');
  }, <LogoutIcon/>)
};

/**
 * A component that follows the app's usual layout: a totally customizable body, but there's a navbar with the component
 * name and the navigation options.
 * Requires a page name and options, that will be delivered to the top level to be included in the navbar.
 * When shown, the component will test the JWT state in order to only allow logged-in users.
 */
export default function BaseComponent({topInfoState, elem, pageName, options}: BaseComponentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const [state, setState] = topInfoState;
    const newState = {
      ...state,
      pageName,
      options: options || [defaultOptions.home(navigate), defaultOptions.logOut(navigate)],
      loading: false
    } as AppInfo;
    if (!config.accessJwt) {
      navigate('/');
      return;
    }
    if (state.pageName !== newState.pageName) setState(newState);
  });

  return elem;
}

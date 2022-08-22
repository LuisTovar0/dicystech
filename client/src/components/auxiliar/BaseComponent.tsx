import {NavigateFunction, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import config from "../../configs/config";
import {AppInfo, AppState, Elem, NavBarOption} from "../App";

export interface BaseComponentProps {
  topState: AppState,
  elem: Elem,
  pageName: string,
  options?: NavBarOption[],
}

export const defaultOptions = {
  home: (navigate: NavigateFunction) => ({handler: () => navigate('/' + config.routes.home), name: "Home Page"}),
  addLab: (navigate: NavigateFunction) => ({handler: () => navigate('/' + config.routes.addLab), name: "Add Lab"}),
  logOut: {
    name: "Log Out", handler: () => {
    }
  }
};

/**
 * A component that follows the app's usual layout: a totally customizable body, but there's a navbar with the component
 * name and the navigation options.
 * Requires a page name and options, that will be delivered to the top level to be included in the navbar.
 * When shown, the component will test the JWT state in order to only allow logged-in users.
 */
export default function BaseComponent({topState, elem, pageName, options}: BaseComponentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const [state, setState] = topState;
    const newState = {
      ...state,
      pageName,
      options: options || [defaultOptions.home(navigate), defaultOptions.logOut],
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

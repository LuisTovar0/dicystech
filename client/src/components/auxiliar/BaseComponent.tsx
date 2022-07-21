import {NavigateFunction, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import config from "../../configs/config";
import {AppInfoSetter, Elem, NavBarOption} from "../App";

export interface BaseComponentProps {
  topInfoState: AppInfoSetter,
  elem: Elem,
  pageName: string,
  options?: NavBarOption[],
}

export const defaultOptions = {
  home: (navigate: NavigateFunction) => ({handler: () => navigate('/home'), name: "Home Page"}),
  addLab: (navigate: NavigateFunction) => ({handler: () => navigate('/addlab'), name: "Add Lab"}),
  logOut: {
    name: "Log Out", handler: () => {
    }
  }
};

/**
 * A component that follows the app's usual layout.
 * Requires a page name and options, that will be delivered to the top level to be included in the navbar.
 * When shown, the component will test the JWT state in order to only allow logged in users.
 */
export default function BaseComponent({topInfoState, elem, pageName, options}: BaseComponentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const newState = {
      pageName,
      options: options || [defaultOptions.home(navigate), defaultOptions.logOut]
    };
    const [state, setState] = topInfoState;
    if (state.pageName !== newState.pageName) setState(newState);
    if (!config.accessJwt) {
      navigate('/');
      return;
    }
  });

  return elem;
}
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import config from "../../configs/config";
import {AppInfoSetter, Elem} from "./App";

export interface BaseComponentProps {
  topInfoState: AppInfoSetter,
  elem: Elem,
  pageName: string,
  options?: Elem[],
}

export const defaultButtons = {
  home: (navigate: NavigateFunction) => <button onClick={() => navigate('/home')}>Home</button>,
  addLab: (navigate: NavigateFunction) => <button onClick={() => navigate('/addlab')}>Add Lab</button>,
};

export default function BaseComponent({topInfoState, elem, pageName, options}: BaseComponentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const newState = {
      pageName,
      options: options || [defaultButtons.home(navigate), <button>Log out</button>]
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
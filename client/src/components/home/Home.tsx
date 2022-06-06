import {AppInfoSetter} from "../app/App";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function Home({topInfoState}: { topInfoState: AppInfoSetter }) {
  const navigate = useNavigate();
  useEffect(() => {
    const newState = {
      pageName: 'Home',
      options: [<button>Log out</button>]
    };
    const [state, setState] = topInfoState;
    if (state.pageName !== newState.pageName) setState(newState);
    if (!Cookies.get('refreshJwt')) {
      navigate('/');
      return;
    }

    console.log('habemus cookie');
  });

  return (<div> You are logged in </div>);
}
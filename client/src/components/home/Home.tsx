import {AppInfoSetter} from "../app/App";
import BaseComponent, {defaultButtons} from "../app/BaseComponent";
import {useNavigate} from "react-router-dom";

export default function Home({topInfoState}: { topInfoState: AppInfoSetter }) {
  const navigate = useNavigate();

  return (<BaseComponent topInfoState={topInfoState} pageName={'Home'} options={[
    defaultButtons.home(navigate), defaultButtons.addLab(navigate), <button>Log out</button>
  ]} elem={
    <div> You are logged in </div>
  }/>);
}
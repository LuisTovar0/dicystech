import {AppInfoSetter} from "./App";
import BaseComponent, {defaultOptions} from "./auxiliar/BaseComponent";
import {useNavigate} from "react-router-dom";

export default function Home({topInfoState}: { topInfoState: AppInfoSetter; }) {
  const navigate = useNavigate();

  return (<BaseComponent topInfoState={topInfoState} pageName={'Home'} options={[
    defaultOptions.addLab(navigate), defaultOptions.logOut
  ]} elem={
    <div style={{display: "grid", placeItems: "center"}}> You are logged in </div>
  }/>);
}
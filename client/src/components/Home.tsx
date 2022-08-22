import {AppState} from "./App";
import BaseComponent, {defaultOptions} from "./auxiliar/BaseComponent";
import {useNavigate} from "react-router-dom";

export default function Home({topState}: { topState: AppState }) {
  const navigate = useNavigate();

  return (<BaseComponent topState={topState} pageName={'Home'} options={[
    defaultOptions.addLab(navigate), defaultOptions.logOut
  ]} elem={
    <div style={{display: "grid", placeItems: "center", minHeight: '70vh'}}>
      Welcome to the DICYSTECH Hub!
    </div>
  }/>);
}
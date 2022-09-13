import {AppStateProps} from "./App";
import BaseComponent, {defaultOptions} from "./auxiliar/BaseComponent";
import {useNavigate} from "react-router-dom";

export default function Home({topInfoState}: AppStateProps) {
  const navigate = useNavigate();

  return (<BaseComponent topInfoState={topInfoState} pageName={'Home'} options={[
    defaultOptions.addLab(navigate), defaultOptions.logOut(navigate)
  ]} elem={
    <div style={{display: "grid", placeItems: "center", minHeight: '70vh'}}>
      Welcome to the DICYSTECH Hub!
    </div>
  }/>);
}
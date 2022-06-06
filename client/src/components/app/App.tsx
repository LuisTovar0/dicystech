import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import {Login} from "../auth/Login";
import {Register} from "../auth/Register";
import Redirect from "../../redirect";
import Home from "../home/Home";

export type Elem = JSX.Element;

export interface AppTopLevelInfo {
  pageName: string,
  options: Elem[]
}

export type AppInfoSetter = [AppTopLevelInfo, React.Dispatch<React.SetStateAction<AppTopLevelInfo>>];

function App() {
  const topLevelInfoState = useState({pageName: '', options: []} as AppTopLevelInfo);
  const [{pageName, options}] = topLevelInfoState;

  return (<>
    <div className="topbar">
      <div id="topbar-img"><img src="logo_name.png"/></div>
      <div id="pagename"><p>{pageName}</p></div>
      <div id="options">{options}</div>
    </div>
    <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Redirect/>}/>
            <Route path="login" element={<Login topInfoState={topLevelInfoState}/>}/>
            <Route path="register" element={<Register topInfoState={topLevelInfoState}/>}/>
            <Route path="home" element={<Home topInfoState={topLevelInfoState}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </>);
}

export default App;

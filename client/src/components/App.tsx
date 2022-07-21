import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppBar} from "@mui/material";
import 'fontsource-roboto';

import './App.css';
import {Login} from "./auth/Login";
import {Register} from "./auth/Register";
import Redirect from "../redirect";
import Home from "./home/Home";
import AddLab from "./AddLab";
import {PageName, StyledToolbar} from '../styles/App';
import NavbarMenu from './auxiliar/NavbarMenu';

export type Elem = JSX.Element;

export interface AppTopLevelInfo {
  pageName: string,
  options: NavBarOption[]
}

export interface NavBarOption {
  name: string,
  handler: any
}

export type AppInfoSetter = [AppTopLevelInfo, React.Dispatch<React.SetStateAction<AppTopLevelInfo>>];

function App() {
  const topLevelInfoState = useState<AppTopLevelInfo>({pageName: '', options: []});
  const [{pageName, options}] = topLevelInfoState;

  return (<>
    {/*<div className="topbar">*/}
    {/*  <div id="topbar-img"><img src="logo_name.png"/></div>*/}
    {/*  <div id="pagename"><p>{pageName}</p></div>*/}
    {/*  <div id="options">{options}</div>*/}
    {/*</div>*/}
    <AppBar position="static">
      <StyledToolbar>
        <div id="topbar-img"><img src="logo_name.png"/></div>
        <PageName className="pagename">
          {pageName}
        </PageName>
        <NavbarMenu options={options}/>
      </StyledToolbar>
    </AppBar>
    <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Redirect/>}/>
            <Route path="login" element={<Login topInfoState={topLevelInfoState}/>}/>
            <Route path="register" element={<Register topInfoState={topLevelInfoState}/>}/>
            <Route path="home" element={<Home topInfoState={topLevelInfoState}/>}/>
            <Route path="addlab" element={<AddLab topInfoState={topLevelInfoState}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </>);
}

export default App;

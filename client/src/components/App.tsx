import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppBar, Box} from "@mui/material";
import 'fontsource-roboto';

import {Login} from "./auth/Login";
import {CreateAccount} from "./auth/CreateAccount";
import Redirect from "../redirect";
import Home from "./Home";
import AddLab from "./AddLab";
import {Navbar, PageName} from '../styles/AppStyles';
import NavbarMenu from './auxiliar/NavbarMenu';

export type Elem = JSX.Element;

export interface AppTopLevelInfo {
  pageName: string,
  options: NavBarOption[]
}

export interface NavBarOption {
  icon?: Elem,
  name: string,
  handler: any
}

export type AppInfoSetter = [AppTopLevelInfo, React.Dispatch<React.SetStateAction<AppTopLevelInfo>>];

function App() {
  const topLevelInfoState = useState<AppTopLevelInfo>({pageName: '', options: []});
  const [{pageName, options}] = topLevelInfoState;

  return (<>
    <AppBar position="static">
      <Navbar>
        <Box
          component="img" src="logo_name.png"
          style={{maxHeight: "70%", maxWidth: "70rem"}}
        />
        <PageName className="pagename"> {pageName} </PageName>
        <NavbarMenu options={options}/>
      </Navbar>
    </AppBar>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Redirect/>}/>
          <Route path="login" element={<Login topInfoState={topLevelInfoState}/>}/>
          <Route path="createAccount" element={<CreateAccount topInfoState={topLevelInfoState}/>}/>
          <Route path="home" element={<Home topInfoState={topLevelInfoState}/>}/>
          <Route path="addlab" element={<AddLab topInfoState={topLevelInfoState}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;

import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppBar, Backdrop, Box, CircularProgress} from "@mui/material";
import 'fontsource-roboto';

import config from "../config";
import {CreateAccount} from "./auth/CreateAccount";
import Redirect from "../redirect";
import {Navbar, PageName} from '../styles/appStyles';
import NavbarMenu from './auxiliar/NavbarMenu';
import {Login} from "./auth/Login";
import Home from "./Home";
import AddLab from "./addLab/AddLab";

export type Elem = JSX.Element;

export interface AppInfo {
  pageName: string;
  options: NavBarOption[];
  snackbar?: Elem;
  loading: boolean;
}

export interface NavBarOption {
  icon?: Elem;
  name: string;
  handler: any;
}

export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type AppState = State<AppInfo>;

function App() {
  const topInfoState = useState<AppInfo>({pageName: '', options: [], loading: false});
  const [{pageName, options, snackbar, loading}] = topInfoState;

  return (<>
    <AppBar position="static">
      <Navbar>
        <Box
          component="img" src="logo_name.png"
          style={{maxHeight: "70%", maxWidth: "25%"}}
        />
        <PageName className="pagename"> {pageName} </PageName>
        <NavbarMenu options={options}/>
      </Navbar>
    </AppBar>

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Redirect topInfoState={topInfoState}/>}/>
          <Route path={config.routes.login} element={<Login topInfoState={topInfoState}/>}/>
          <Route path={config.routes.createAccount} element={<CreateAccount topInfoState={topInfoState}/>}/>
          <Route path={config.routes.home} element={<Home topState={topInfoState}/>}/>
          <Route path={config.routes.addLab} element={<AddLab topInfoState={topInfoState}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    {snackbar}

    {/* Loading */}
    <Backdrop open={loading ?? false}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  </>);
}

export default App;

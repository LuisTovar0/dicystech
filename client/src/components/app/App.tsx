import React, {Dispatch, SetStateAction, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import {Login} from "../auth/Login";
import {Register} from "../auth/Register";
import Redirect from "../../redirect";
import Home from "../home/Home";

export interface AppComponentProps {
  setPageName: Dispatch<SetStateAction<string>>;
}

function App() {
  const [pagename, setPageName] = useState('');

  return (<>
    <div className="topbar">
      <img src="logo_name.png"/>
      <div id="pagename">{pagename}</div>
    </div>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Redirect/>}/>
            <Route path="login" element={<Login setPageName={setPageName}/>}/>
            <Route path="register" element={<Register setPageName={setPageName}/>}/>
            <Route path="home" element={<Home setPageName={setPageName}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </>);
}

export default App;

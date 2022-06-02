import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import {Login} from "../register_login/Login";
import {Register} from "../register_login/Register";
import Redirect from "../../redirect";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Redirect/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

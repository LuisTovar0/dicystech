import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './components/app/App';
import dependencyInjector from "./configs/dependencyInjector";

// dependencyInjector();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);

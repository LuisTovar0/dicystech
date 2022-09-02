import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@mui/material';

import './index.css';
import App from './components/App';
import {Theme} from './styles/appStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);

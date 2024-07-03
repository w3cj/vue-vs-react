import React from 'react';
import ReactDOM from 'react-dom/client';
import '@picocss/pico/css/pico.css';
import { WrappedApp } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);

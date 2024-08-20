import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const initialData = (window as any).__INITIAL_DATA__;

ReactDOM.hydrate(
  <BrowserRouter>
    <App initialData={initialData} />
  </BrowserRouter>,
  document.getElementById('root')
);
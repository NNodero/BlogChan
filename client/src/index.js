import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

//https://blogchan-server.onrender.com
//http://localhost:3009
axios.defaults.baseURL ="https://blogchan-server.onrender.com"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


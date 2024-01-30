import React from 'react';
import ReactDOM from 'react-dom/client';
import _ from 'lodash';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Card,
  Divider,
  Image,
  Placeholder,
} from 'semantic-ui-react';

const pvb_main = ReactDOM.createRoot(document.getElementById('root'));
pvb_main.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

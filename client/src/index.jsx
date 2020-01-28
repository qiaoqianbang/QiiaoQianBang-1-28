import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import Myaxios from './utils/index';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import md5 from 'js-md5';
React.Component.prototype.$axios = Myaxios;
React.Component.prototype.$md5 = md5;
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

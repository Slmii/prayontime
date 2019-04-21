import '@babel/polyfill';
import 'normalize.css/normalize.css';
import './style.scss';


// import axios             from 'axios';
import React                            from 'react';
import { render }                       from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk';

import keys              from './config/keys';
import reducers          from './reducers/combineReducers';

import App               from './App';

// const axiosInstance = axios.create({
//     baseURL: keys.baseURL
// });

const store = createStore(
    reducers,
    {}, 
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root-app')  
);

console.log('BASE URL', keys.baseURL);
console.log('ENVIRONMENT IS', process.env.NODE_ENV);
console.log('REACT VERSION', React.version);
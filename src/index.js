import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.js';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
    <App />
  </Provider>
  
  );


reportWebVitals();

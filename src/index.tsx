import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

import {store}  from './services/store';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);
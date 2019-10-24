import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/css-reset.css';
import './stylesheets/index.css';
import { App } from './components/Main';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import store from './services/redux/store';

ReactDOM.render(
  (
    <Provider store={ store }>
      <BrowserRouter>
        <Route path='/' render={(props) => <App {...props} /> } />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
);

serviceWorker.unregister();

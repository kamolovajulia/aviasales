import React from 'react';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import { composeWithDevTools } from '@redux-devtools/extension';
import './index.css';
import AppContainer from './App/App-container';

import Reducer from './redux/reducer';

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import allreducers from './reducers'
import {Provider} from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import {PersistGate} from 'redux-persist/integration/react'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
require('dotenv').config();

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, allreducers)

const store = createStore(persistedReducer, composeWithDevTools());
let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

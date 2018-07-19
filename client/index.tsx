import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import { App } from "./components/App";
import {Provider} from 'react-redux';
import initialState from "./initialState";
//mport reducers from 'reducers';
//import startChat from './chat';
import startChat, {chatMiddleware} from './chat-middlerware';
 console.log(initialState);
import { configure } from './store';
const store = configure(initialState);
startChat(store);
//startChat(store);
const ROOT = document.querySelector(".container");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, ROOT);
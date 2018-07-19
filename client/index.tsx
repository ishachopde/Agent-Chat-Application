/**
 * React entry page.
 * @author  Isha CHopde
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import {Provider} from 'react-redux';
import initialState from "./initialState";
import startChat, {chatMiddleware} from './chat-middlerware';
import { configure } from './store';
const store = configure(initialState);

// Pass chat middlerware our instance of store.
startChat(store);

const ROOT = document.querySelector(".container");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, ROOT);
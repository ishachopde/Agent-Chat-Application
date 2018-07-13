import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
let store = null;
import {chatMiddleware} from './chat-middlerware';
import userNameReducer from "./reducers/UserNameReducer";
export const configure = (initialState) => {
    const actionTrackerReducer = function(state = "", action) {
        switch (action.type) {
            default :
                return {
                    action
                };
        }
    };

    const appReducer = combineReducers({
        userName: userNameReducer
    });

    store = createStore(appReducer, initialState, compose(
        applyMiddleware(chatMiddleware)
    ));

    return store;
};

export const getStore = () => {
    return store;
};

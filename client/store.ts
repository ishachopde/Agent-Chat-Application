/**
 * Create redux store with provided reducers.
 * @author  Isha CHopde
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
let store = null;
import {chatMiddleware} from './chat-middlerware';
import userReducer from "./reducers/UserReducer";
import chatsReducer from "./reducers/ChatsReducer";
import chatBoardReducer from "./reducers/ChatBoardReducer";
import AgentReducer from "./reducers/AgentReducer";
import connectedUsersReducer from "./reducers/ConnectedUsers";
export const configure = (initialState) => {
    const appReducer = combineReducers({
        user: userReducer,
        chatBoard: chatBoardReducer,
        chats: chatsReducer,
        agent: AgentReducer,
        connectedUsers: connectedUsersReducer
    });

    store = createStore(appReducer, initialState, compose(
        applyMiddleware(chatMiddleware)
    ));

    return store;
};

export const getStore = () => {
    return store;
};

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
let store = null;
import {chatMiddleware} from './chat-middlerware';
import userNameReducer from "./reducers/UserNameReducer";
import chatsReducer from "./reducers/ChatsReducer";
import chatBoardReducer from "./reducers/ChatBoardReducer";
import AgentReducer from "./reducers/AgentReducer";
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
        user: userNameReducer,
        chatBoard: chatBoardReducer,
        chats: chatsReducer,
        agent: AgentReducer
    });

    store = createStore(appReducer, initialState, compose(
        applyMiddleware(chatMiddleware)
    ));

    return store;
};

export const getStore = () => {
    return store;
};

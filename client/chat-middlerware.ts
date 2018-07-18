import * as io from 'socket.io-client';
 
var socket = null;
import { agentAssigned, userConnected, setConnectedUsersOnlineStatus, setAgentOnlineStatus } from "./actions/userActions";
import { messageReceive } from "./actions/messageActions";
export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    if (socket && action.type === "message-sent") {
      //let messages = store.getState().messages;
        console.log("Emitting messages");
        socket.emit('message', action.payload.message);
    }

      if (socket && action.type === "create-chat-board") {
          let state = store.getState();
          socket.emit('create-board', {
              userName: state.user.name,
              isAgent: state.user.isAgent,
              chatBoardId: state.user.id
          });
      } 
      if (socket && action.type === "set-user-online-status") {
        let state = store.getState();
        socket.emit('user-status-change', {
            userId: state.user.id,
            isOnline: state.user.isOnline,
            isAgent: state.user.isAgent
        });
    }
 
    return result;
  };
}
 
export default function (store) {
  socket = io();
 
  socket.on('message', data => {
      store.dispatch(messageReceive(data));
  });

    socket.on('agent-connected', data => {
        store.dispatch(agentAssigned(data));
    });

    socket.on('user-connected', data => {
        store.dispatch(userConnected(data));
    });

    socket.on('user-status-change', data => {
        console.log(data);
        if(!data.isAgent) 
            store.dispatch(setConnectedUsersOnlineStatus(data.userId, data.isOnline));
        else 
            store.dispatch(setAgentOnlineStatus(data.userId, data.isOnline));
    });
}
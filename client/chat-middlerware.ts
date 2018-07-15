import * as io from 'socket.io-client';
 
var socket = null;
import { agentAssigned, userConnected } from "./actions/userActions";
import { messageReceive } from "./actions/messageActions";
export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    console.log(store.getState());
    if (socket && action.type === "send-message-to-agent") {
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
}
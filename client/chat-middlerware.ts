import * as io from 'socket.io-client';
 
var socket = null;
import { agentAssigned } from "./actions/userActions";
export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
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
      console.log(data);
   // store.dispatch(actions.addResponse(data));
  });

    socket.on('agent-assigned', data => {
        console.log(data);
        store.dispatch(agentAssigned(data));
    });
}
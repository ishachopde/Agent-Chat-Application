/**
 * Redux middler ware to handle socket related operations.
 * @author  Isha CHopde
 */

import * as io from 'socket.io-client';
 
let socket = null;
import { agentAssigned, userConnected, setConnectedUsersOnlineStatus, setAgentOnlineStatus } from "./actions/userActions";
import { messageReceive } from "./actions/messageActions";
export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);

    // Send message to the user.
    if (socket && action.type === "message-sent") {
      //let messages = store.getState().messages;
        console.log("Emitting messages");
        socket.emit('message', action.payload.message);
    }

    // Initialises the application
      if (socket && action.type === "create-chat-board") {
          let state = store.getState();
          socket.emit('create-board', {
              userName: state.user.name,
              isAgent: state.user.isAgent,
              chatBoardId: state.user.id
          });
      } 

      // Set User status.
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
 
    // On receiving the message.
    socket.on('message', data => {
        store.dispatch(messageReceive(data));
    });

    // On agent is connectd to the user.
    socket.on('agent-connected', data => {
        store.dispatch(agentAssigned(data));
    });

    // On user is connectd to the agent.
    socket.on('user-connected', data => {
        store.dispatch(userConnected(data));
    });

    // On user status change, status can be Onine or Offline..
    socket.on('user-status-change', data => {
        console.log(data);
        if(!data.isAgent) 
            store.dispatch(setConnectedUsersOnlineStatus(data.userId, data.isOnline));
        else 
            store.dispatch(setAgentOnlineStatus(data.userId, data.isOnline));
    });
}
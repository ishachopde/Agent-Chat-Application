import * as io from 'socket.io-client';
 
var socket = null;
 
export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    console.log("Emitting messages"); 
    if (socket && action.type === "add-message") {
      //let messages = store.getState().messages;
      socket.emit('message', "Demo");
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
}
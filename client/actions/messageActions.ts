export const UPDATE_MESSAGE = 'update-message';
export const SEND_MESSAGE_TO_AGENT = 'send-message-to-agent';
export const ADD_RESPONSE = 'add-response';
 
export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message };
}
 
export function sendMessageToAgent(message) {
  return {
    type: SEND_MESSAGE_TO_AGENT,
    payload: {
      message
    }
  };
}
 
export function addResponse(message) {
  return { type: ADD_RESPONSE, message };
}
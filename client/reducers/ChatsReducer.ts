const uuidv4 = require('uuid/v4');
const chats = [];
export default (state = chats, action) => {
    switch(action.type) {
        case 'send-message-to-agent':
            return [
                ...state,
                action.payload.message
            ];
        default:
            return state;
    }
}
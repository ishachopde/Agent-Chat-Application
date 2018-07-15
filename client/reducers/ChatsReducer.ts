const uuidv4 = require('uuid/v4');
const chats = {

};
export default (state = chats, action) => {
    switch(action.type) {
        case 'send-message-to-agent':
            const receiverId = action.payload.message.receiverId;
            let messages = state[receiverId];

            if(!messages) {
                state[receiverId] = [action.payload.message];
                return Object.create(state);
            } else {
                state[receiverId] = [
                    ...state[receiverId],
                    action.payload.message
                ]

                return Object.create(state);
            };
        case 'message-received':
            const senderId = action.payload.message.senderId;
            let msgs = state[senderId];
            if(!msgs) {
                state[senderId] = [action.payload.message];
                return Object.create(state);
            } else {
                state[senderId] = [
                    ...state[senderId],
                    action.payload.message
                ]

                return Object.create(Object.create(state));
            }   
        default:
            return state;
    }
}
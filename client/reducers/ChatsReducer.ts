const uuidv4 = require('uuid/v4');
const chats = {

};
export default (state = chats, action) => {
    switch(action.type) {
        case 'message-sent':
            const receiverId = action.payload.message.receiverId;
            let messages = state[receiverId];

            if(!messages) {
                state[receiverId] = [action.payload.message];
                return Object.assign({},state);
            } else {
                state[receiverId] = [
                    ...state[receiverId],
                    action.payload.message
                ]

                return Object.assign({},state);
            };
        case 'message-received':
            const senderId = action.payload.message.senderId;
            let msgs = state[senderId];
            if(!msgs) {
                state[senderId] = [action.payload.message];
                return Object.assign({},state);
            } else {
                state[senderId] = [
                    ...state[senderId],
                    action.payload.message
                ]

                return Object.assign({},state);
            }    
        default:
            return state;
    }
}
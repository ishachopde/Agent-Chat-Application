
const chatBoard = {
    chatBoardId: ""
};
export default (state = chatBoard, action) => {
    switch(action.type) {
        case 'create-chat-board':
            return {
                ...state,
                chatBoardId: action.payload.chatBoardId
            }

        default:
            return state;
    }
}
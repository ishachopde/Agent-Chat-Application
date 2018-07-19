import initialState from "../initialState";

export default (state = initialState.chatBoard, action) => {
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
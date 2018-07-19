/**
 * Initial state of the store.
 * @author  Isha CHopde
 */

export default {
    agent: {
        userName: "",
        id: "",
        isOnline: false,
    },
    user : {
        name: "",
        isAgent: false,
        id: "",
        isOnline: false,
        onlineCount: 0,
        offlineCount: 0,
        lastMessageTimer: 0
    },
    chatBoard: {
        chatBoardId: ""
    },
    connectedUsers: [],
    chats: {}
};

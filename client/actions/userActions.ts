export const CHANGE_USERINFO = 'change-userinfo';
export const CREATE_CHAT_BOARD = 'create-chat-board';
export const AGENT_ASSIGNED = 'agent-assigned';
export function setUserInfo(userName, isAgent, id) {
    return {
        type: CHANGE_USERINFO,
        payload: {
            userName: userName,
            isAgent,
            id
        }
    };
}

export function createChatBoard(chatBoardId) {
    return {
        type: CREATE_CHAT_BOARD,
        payload: {
            chatBoardId
        }
    };
}

export function agentAssigned(agent) {
    return {
        type: AGENT_ASSIGNED,
        payload: {
            agent
        }
    };
}
import initialState from "../initialState";

export default (state = initialState.agent, action) => {
    switch(action.type) {
        case 'agent-assigned':
            return action.payload.agent;
        case 'set-connected-agent-online-status':
            console.log({
                ...state,
                isOnline: action.payload.status
            });
            return {
                ...state,
                isOnline: action.payload.status
            }
        default:
            return state;
    }
}
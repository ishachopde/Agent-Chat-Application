/**
 * reducer to handle actions related to Agent.
 * @author  Isha CHopde
 */
import initialState from "../initialState";

export default (state = initialState.agent, action) => {
    switch(action.type) {
        case 'agent-assigned':
            return action.payload.agent;
        case 'set-connected-agent-online-status':
            return {
                ...state,
                isOnline: action.payload.status
            }
        default:
            return state;
    }
}
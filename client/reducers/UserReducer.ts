/**
 * User reducer for redux store..
 * @author  Isha CHopde
 */

import initialState from "../initialState";

export default (state = initialState.user, action) => {
    switch(action.type) {
        case 'change-userinfo':
            return {
                ...state,
                name: action.payload.userName,
                isAgent: action.payload.isAgent,
                id: action.payload.id,
                isOnline: true,
                onlineCount: 0,
                offlineCount: 0  
            };
        case 'change-offline-count':
            return {
                ...state,
                offlineCount: state.offlineCount + 1 
            };
        case 'change-online-count':
            return {
                ...state,
                onlineCount: state.onlineCount + 1 
            };
            // Sets status for currrent user.
        case 'set-user-online-status':
            return {
                ...state,
                isOnline: action.payload.status
            };
        default: 
            return state;
    }
}
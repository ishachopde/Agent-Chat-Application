export default (state = [], action) => {
    switch(action.type) {
        case 'user-connected':
            console.log( ...state,
                action.payload.user);
            return [
                ...state,
                action.payload.user
            ]
        case 'set-connected-users-online-status':
            const { userId, status} = action.payload;
            return state.map(user => user.id === userId ? {...user, isOnline: status} : user); 
        default:
            return state;
    }
}
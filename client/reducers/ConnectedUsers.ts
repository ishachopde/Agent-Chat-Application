export default (state = [], action) => {
    switch(action.type) {
        case 'user-connected':
            return [
                ...state,
                action.payload.user
            ]
        default:
            return state;
    }
}
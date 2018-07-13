const userName = "";
export default (state = userName, action) => {
    switch(action.type) {
        case 'change-username':
            return action.payload.userName;
        default: 
            return state;
    }
}
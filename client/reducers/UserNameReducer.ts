const userName = {
    name : "",
    isAgent: false
};
export default (state = userName, action) => {
    switch(action.type) {
        case 'change-userinfo':
            return {
                ...state,
                name: action.payload.userName,
                isAgent: action.payload.isAgent,
                id: action.payload.id
            };
        default: 
            return state;
    }
}
const agent = {
    name : "",
    id: false
};
export default (state = agent, action) => {
    switch(action.type) {
        case 'agent-assigned':
            return action.payload.agent;
        default:
            return state;
    }
}
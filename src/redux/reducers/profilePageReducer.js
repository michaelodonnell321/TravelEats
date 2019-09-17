const profilePageReducer = (state = [{}], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_GROUP':
            return action.payload;
        default:
            return state;
    }
}

export default profilePageReducer;
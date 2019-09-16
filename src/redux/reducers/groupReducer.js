const groupReducer = (state = [{}], action) => {
    switch (action.type) {
        case 'SET_GROUP':
            return action.payload;
        case 'SET_ALL_GROUPS':
            return action.payload;
        default:
            return state;
    }
}

export default groupReducer
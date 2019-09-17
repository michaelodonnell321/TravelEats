const profileUserInfo = (state=[{}], action) => {
    switch(action.type){
        case 'SET_PROFILE_INFO':
            return action.payload
        default:
            return state;
    }
}

export default profileUserInfo;
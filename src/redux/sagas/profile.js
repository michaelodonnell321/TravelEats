import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* getProfileInfo(action) {
    let userID = action.payload
    try {
       const response = yield axios.get(`/api/profile/${userID}`)
       yield put({
           type: 'SET_PROFILE_INFO',
           payload: response.data
       })
    }
    catch (error) {
        console.log('error in get profile saga', error)
    }
}

function* updateUserInfo(action) {
    let userID = action.payload.userId;
    try {
        yield axios.put(`/api/profile/${userID}`, action.payload)
    }
    catch (error) {
        console.log('error in updated user info saga', error)
    }
}

function* profile() {
    yield takeEvery('GET_PROFILE_INFO', getProfileInfo)
    yield takeEvery('UPDATE_USER_INFO', updateUserInfo)
}

export default profile;
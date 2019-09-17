import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

function* getAdminGroupInfo(action) {
    let activeGroupID = action.payload
    try {
        const response = yield axios.get(`/admin/${activeGroupID}`)
        yield put ({
            type: 'SET_ADMIN_INFO',
            payload: response.data
        })
    } catch (error) {
        console.log('error in admin saga', error)
    }
}

function* adminSaga() {
    yield takeEvery('GET_ADMIN_GROUP_INFO', getAdminGroupInfo)
}

export default adminSaga;
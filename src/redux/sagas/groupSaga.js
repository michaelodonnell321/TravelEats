import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';


function* addGroup(action) {
    try {
        yield axios.post('/api/group', action.payload)
    }
    catch (error) {
        console.log('error in add group saga', error)
    }
}

function* getGroup(action) {
    try {
        const response = yield axios.get('/api/group');
        yield put ({
            type: 'SET_GROUP',
            payload: response.data
        })
    } catch (error) {
        console.log('error in get group saga', error);
    }
}

function* fetchGroups(action) {
    try {
        const response = yield axios.get('/api/group/allgroups');
        yield put ({
            type: 'SET_ALL_GROUPS',
            payload: response.data
        })
    } catch (error) {
        console.log('error in the fetch groups saga', error);
    }
}

function* clickActiveGroup(action) {
    try {
        yield axios.put('/api/group/', action.payload);
        console.log(action.payload);
        yield put ({
            type: 'FETCH_ACTIVE_GROUP',
            payload: action.payload.name
        })
    } catch (error) {
        console.log('error in the active group saga', error);
    }
}

function* fetchActiveGroup(action) {
    let id = action.payload;
    console.log('fetch active group payload is', action.payload)
    try {
        const response = yield axios.get(`/api/group/active/${id}`)
        yield put({
            type: 'SET_ACTIVE_GROUP',
            payload: response.data
        })
    } catch (error) {
        console.log('error in the fetch active group saga', error);
    }
}

function* groups() {
    yield takeEvery('ADD_GROUP', addGroup)
    yield takeEvery('GET_GROUP', getGroup)
    yield takeEvery('FETCH_ALL_GROUPS', fetchGroups)
    yield takeEvery('CLICK_ACTIVE_GROUP', clickActiveGroup)
    yield takeEvery('FETCH_ACTIVE_GROUP', fetchActiveGroup)
}

export default groups;
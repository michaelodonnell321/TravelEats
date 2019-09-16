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

function* groups() {
    yield takeEvery('ADD_GROUP', addGroup)
    yield takeEvery('GET_GROUP', getGroup)
    yield takeEvery('FETCH_ALL_GROUPS', fetchGroups)
}

export default groups;
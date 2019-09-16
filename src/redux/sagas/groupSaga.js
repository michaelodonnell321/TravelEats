import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';


function* addGroup(action) {
    let adminID = action.payload.adminID
    let groupName = action.payload.newGroup.newGroupName
    let groupID = action.payload.newGroup.newGroupID
    try {
        yield axios.post('/api/group', action.payload)
    }
    catch (error) {
        console.log('error in add group saga', error)
    }
}

function* groups() {
    yield takeEvery('ADD_GROUP', addGroup);
}

export default groups;
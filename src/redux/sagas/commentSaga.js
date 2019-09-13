import axios from 'axios';
import {takeEvery, put} from 'redux-saga/effects';


function* submitComment(action) {
    console.log('submit comment payload', action.payload)
    try {
        yield axios.post('/api/comment', action.payload)
        yield put ({
            type: 'GET_DETAILS',
            payload: action.payload.id
        })
    } catch (error) {
        console.log('error with submit comment post', error)
    }
}

function* deleteComment(action) {
    //action.payload has id of comment to be deleted from click
    let id = action.payload.id;
    let detailsID = action.payload.detailsID
    try {
        yield axios.delete(`/api/comment/${id}`)
        yield put ({
            type: 'GET_DETAILS',
            payload: detailsID
        })
    }
    catch (error) {
        console.log('error with delete comment', error)
    }
}

function* editComment(action) {
    let id = action.payload.id;
    let detailsID = action.payload.detailsID
    console.log('edit comment payload is', action.payload);
    try {
        yield axios.put(`/api/comment/${id}`, action.payload)
        yield put ({
            type: 'GET_DETAILS',
            payload: detailsID
        })
    }
    catch (error) {
        console.log('error with edit comment', error)
    }
}

function* comments() {
    yield takeEvery('SUBMIT_COMMENT', submitComment)
    yield takeEvery('DELETE_COMMENT', deleteComment)
    yield takeEvery('EDIT_COMMENT', editComment)
}

export default comments;
import axios from 'axios';
import {takeEvery, put} from 'redux-saga/effects';


function* submitComment(action) {
    try {
        yield axios.post('/api/comment', action.payload)
        yield put ({
            type: 'GET_DETAILS',
            payload: this.props.match.params.id
        })
    } catch (error) {
        console.log('error with submit comment post', error)
    }
}

function* deleteComment(action) {
    //action.payload has id of comment to be deleted from click
    let id = action.payload;

    try {
        yield axios.delete(`/api/comment/${id}`)
    }
    catch (error) {
        console.log('error with delete comment', error)
    }
}

function* comments() {
    yield takeEvery('SUBMIT_COMMENT', submitComment)
    yield takeEvery('DELETE_COMMENT', deleteComment)
}

export default comments;
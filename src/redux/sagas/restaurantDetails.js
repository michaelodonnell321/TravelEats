import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getDetails(action) {
    try {
        console.log('in get details');
        let id = action.payload
        const response = yield axios.get(`/api/restaurant/${id}`)
        console.log('saga get details response', response.data);
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        })
    } catch (error) {
        console.log('error in get details saga', error);
    }
}

function* restaurantDetails() {
    yield takeEvery('GET_DETAILS', getDetails)
}

export default restaurantDetails;
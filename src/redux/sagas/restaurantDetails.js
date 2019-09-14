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

function* closeRestaurant(action) {
    try {
        let id = action.payload.id
        let detailsID = action.payload.restaurantID
        yield axios.put(`/api/restaurant/closed/${id}`, id)
        yield put({
            type: 'GET_DETAILS',
            payload: detailsID
        })
    }
    catch (error) {
        console.log('error in close restaurant saga', error);
    }
}

function* openRestaurant(action) {
    try {
        let id = action.payload.id
        let detailsID = action.payload.restaurantID
        yield axios.put(`/api/restaurant/open/${id}`, id)
        yield put({
            type: 'GET_DETAILS',
            payload: detailsID
        })
    }
    catch (error) {
        console.log('error in open restaurant saga', error);
    }
}

function* restaurantDetails() {
    yield takeEvery('GET_DETAILS', getDetails)
    yield takeEvery('CLOSE_RESTAURANT', closeRestaurant)
    yield takeEvery('OPEN_RESTAURANT', openRestaurant)
}

export default restaurantDetails;
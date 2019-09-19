import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

function* getSearchResults(action) {
    let searchText = action.payload
    try{
        const response = yield axios.get(`/api/restaurant/search/${searchText}`)
        yield put ({
            type: 'SET_RESTAURANTS',
            payload: response.data
        })
    }
    catch(error) {
        console.log('error in get search results saga', error);
    }
}

function* search() {
    yield takeEvery('GET_SEARCH_RESULTS', getSearchResults)
}

export default search;
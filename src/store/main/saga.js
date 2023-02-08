import axios from "axios"
import { call, put, takeEvery } from "redux-saga/effects"
import mainReducerSlice from "."
import api from "../../api"

const { actions } = mainReducerSlice

function* fetchCharacters(action) {
    const URL = action.payload?.url
    let params = action.payload?.params
    let searchParams = null;
    const query = action.payload?.query
    if (query) {
        searchParams = { name: query }
    }
    try {
        const results = yield URL ? call(axios.get, URL) : call(api.fetchCharacters, params || searchParams)
        if (params) {
            results.data.filters = params
        }
        yield put(actions.fetchCharactersSuccess(results.data))
    }
    catch (e) {
        yield put(actions.fetchCharactersError(e?.response?.data || "error"))
    }
}

function* fetchFilteredCharacters(action) {
    try {
        const { data } = yield call(api.fetchFilteredCharacters, action.payload.characters)
        yield put(actions.fetchFilteredCharactersSuccess(data))
    }
    catch (e) {
        console.log(e)
        yield put(actions.fetchCharactersError(e?.response?.data || "error"))
    }
}

function* fetchLocations(action) {
    const URL = action.payload?.url
    try {
        const results = yield URL ? call(axios.get, URL) : call(api.fetchLocations)
        yield put(actions.fetchLocationsSuccess(results.data))
    }
    catch (e) {
        yield put(actions.fetchLocationsError(e?.response?.data || "error"))
    }
}

function* mainSaga() {
    yield takeEvery(actions.fetchCharacters.type, fetchCharacters)
    yield takeEvery(actions.resetCharacters.type, fetchCharacters)
    yield takeEvery(actions.fetchLocations.type, fetchLocations)
    yield takeEvery(actions.fetchFilteredCharacters.type, fetchFilteredCharacters)
}

export default mainSaga
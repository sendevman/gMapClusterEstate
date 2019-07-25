import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import {
	GET_LIST_START,
	GET_LIST_ID_START,
	GET_DATA_START,
} from './constants';
import { setList, setListID } from './actions';
import { getData } from './api';

function* asyncGetList(param) {
	const { token, type } = param.payload;
	const response = yield call(getData, token, type);
	console.log(response);
	yield put(setList(response, type));
}

function* asyncGetListID(param) {
	const { token, fType, id, sType } = param.payload;
	const response = yield call(getData, token, `${fType}/${id}/${sType}`);
	console.log(response);
	yield put(setListID(response, fType));
}

function* asyncGetData(param) {
	const { token, url } = param.payload;
	const response = yield call(getData, token, url);
	console.log(response);
	// yield put(setListID(response, fType));
}

export function* sagaWatcher() {
	yield takeEvery(GET_LIST_START, asyncGetList);
	yield takeEvery(GET_LIST_ID_START, asyncGetListID);
	yield takeEvery(GET_DATA_START, asyncGetData);
}

export default [
	sagaWatcher(),
];

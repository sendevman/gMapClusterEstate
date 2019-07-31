import { put, call, takeLatest } from 'redux-saga/effects';

import { GET_PROPERTY_START } from './constants';
import { setProperty } from './actions';
import { getProperty } from './api';

function* asyncGetProperty(param) {
	const { token, id } = param.payload;
	console.log(id);
	const response = yield call(getProperty, token, id);
	console.log(response);
	yield put(setProperty(response));
}

export function* sagaWatcher() {
	yield takeLatest(GET_PROPERTY_START, asyncGetProperty);
}

export default [
	sagaWatcher(),
];

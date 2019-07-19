import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import { GET_LIST_START } from './constants';
import { setList } from './actions';
import { getList } from './api';

function* asyncGetList(param) {
	const response = yield call(getList, param.payload);
	console.log(response);
	// yield put(setList(response));
}

export function* sagaWatcher() {
	yield takeEvery(GET_LIST_START, asyncGetList);
}

export default [
	sagaWatcher(),
];

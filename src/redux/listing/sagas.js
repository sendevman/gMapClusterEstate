import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import { GET_LIST_START, GET_LIST_ID_START } from './constants';
import { setList, setListID } from './actions';
import { getData } from './api';

function* asyncGetList(param) {
	const { token, type } = param.payload;
	const response = yield call(getData, token, type);
	yield put(setList(response, type));
}

function* asyncGetListID(param) {
	const { token, fType, id, sType } = param.payload;
	const response = yield call(getData, token, `${fType}/${id}/${sType}`);
	yield put(setListID(response, fType));
}

export function* sagaWatcher() {
	yield takeEvery(GET_LIST_START, asyncGetList);
	yield takeEvery(GET_LIST_ID_START, asyncGetListID);
}

export default [
	sagaWatcher(),
];

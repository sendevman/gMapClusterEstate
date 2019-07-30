import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
	GET_LIST_START,
	GET_LIST_ID_START,
	GET_DATA_START,
	GET_COORDINATE_PROPERTY_START,
} from './constants';
import { setList, setListID } from './actions';
import { getData, getCoordinateProperty } from './api';

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

function* asyncGetCoordinateProperty(param) {
	const { token, data } = param.payload;
	let url = '';
	_.each(_.keys(data), (item, index) => {
		if (index === 0) {
			url = '?' + item + '=' + data[item] + '&';
		} else if ((index + 1) === _.keys(data).length) {
			url = url + item + '=' + data[item];
		} else {
			url = url + item + '=' + data[item] + '&';
		}
	});
	const response = yield call(getCoordinateProperty, token, url);
	yield put(setListID(response, 'properties'));
}

export function* sagaWatcher() {
	yield takeEvery(GET_LIST_START, asyncGetList);
	yield takeEvery(GET_LIST_ID_START, asyncGetListID);
	yield takeEvery(GET_DATA_START, asyncGetData);
	yield takeLatest(GET_COORDINATE_PROPERTY_START, asyncGetCoordinateProperty);
}

export default [
	sagaWatcher(),
];

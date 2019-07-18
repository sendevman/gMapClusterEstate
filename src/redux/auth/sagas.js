import { put, call, takeLatest } from 'redux-saga/effects';

import { AUTH_SIGNUP, AUTH_LOGIN } from './constants';
import { setToken } from './actions';
import { authLogin, authSignup } from './api';

function* asyncAuthLogin(param) {
	const token = yield call(authLogin, param.payload.auth);
	yield put(setToken(token));
}

function* asyncAuthSignup(param) {
	const token = yield call(authSignup, param.payload.auth);
	yield put(setToken(token));
}

export function* sagaWatcher() {
	yield takeLatest(AUTH_LOGIN, asyncAuthLogin);
	yield takeLatest(AUTH_SIGNUP, asyncAuthSignup);
}

export default [
	sagaWatcher(),
];

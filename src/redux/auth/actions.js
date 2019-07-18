import { createAction } from 'redux-actions';
import { AUTH_SIGNUP, AUTH_LOGIN, SET_TOKEN } from './constants';

export const authLogin = createAction(
	AUTH_LOGIN,
	(auth) => ({ auth }),
);

export const authSignup = createAction(
	AUTH_SIGNUP,
	(auth) => ({ auth }),
);

export const setToken = createAction(
	SET_TOKEN,
	(token) => ({ token }),
);

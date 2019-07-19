import { createAction } from 'redux-actions';

import { GET_LIST_START, SET_LIST } from './constants';

export const getList = createAction(
	GET_LIST_START,
	(token, type) => ({ token, type }),
);

export const setList = createAction(
	SET_LIST,
	(list, type) => ({ list, type }),
);

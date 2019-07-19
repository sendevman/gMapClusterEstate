import { createAction } from 'redux-actions';

import {
	GET_LIST_START,
	GET_LIST_ID_START,
	SET_LIST,
	SET_LIST_ID,
} from './constants';

export const getList = createAction(
	GET_LIST_START,
	(token, type) => ({ token, type }),
);

export const setList = createAction(
	SET_LIST,
	(list, type) => ({ list, type }),
);

export const getListID = createAction(
	GET_LIST_ID_START,
	(token, fType, id, sType) => ({ token, fType, id, sType }),
);

export const setListID = createAction(
	SET_LIST_ID,
	(list, type) => ({ list, type }),
);

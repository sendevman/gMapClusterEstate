import { createAction } from 'redux-actions';

import {
	GET_PROPERTY_START,
	SET_PROPERTY,
} from './constants';

export const getProperty = createAction(
	GET_PROPERTY_START,
	(token, id) => ({ token, id }),
);

export const setProperty = createAction(
	SET_PROPERTY,
	(data) => ({ data }),
);

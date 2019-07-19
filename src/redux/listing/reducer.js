import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

import { SET_LIST, SET_LIST_ID } from './constants';

const initialState = fromJS({
	list: {
		countries: [],
		regions: [],
		cities: [],
		properties: [],
	},
	id_list: {
		regions: [],
		cities: [],
		properties: [],
		images: [],
	}
});

export default handleActions({
	[SET_LIST]: (state, { payload: { list, type } }) =>
		state
			.updateIn(['list', type], () => List(list[type].map(item => item))),
	[SET_LIST_ID]: (state, { payload: { list, type } }) =>
		state
			.updateIn(['id_list', type], () => List(list[type].map(item => item))),
}, initialState);

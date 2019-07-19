import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

import { SET_LIST } from './constants';

const initialState = fromJS({
	listItems: {
		listData: [],
	},
});

export default handleActions({
	[SET_LIST]: (state, action) =>
		state
			.updateIn(['listItems', 'listData'], () => List(action.payload.list.homeData.map(item => item))),
}, initialState);

import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { SET_PROPERTY } from './constants';

const initialState = fromJS({
	property: {}
});

export default handleActions({
	[SET_PROPERTY]: (state, { payload: { data } }) =>
		state
			.set('property', Map(data.property)),
}, initialState);

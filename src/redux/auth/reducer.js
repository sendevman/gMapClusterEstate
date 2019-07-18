import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
	SET_TOKEN,
} from './constants';

const initialState = fromJS({
	token: '',
});

export default handleActions({
	[SET_TOKEN]: (state, action) => state.set('token', action.payload.token),
}, initialState);

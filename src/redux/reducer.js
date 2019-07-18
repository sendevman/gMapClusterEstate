import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import authReducer from './auth/reducer';

export default function createReducer() {
	return combineReducers({
		form,
		auth: authReducer,
	});
}

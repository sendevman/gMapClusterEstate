import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import authReducer from './auth/reducer';
import listingReducer from './listing/reducer';
import propertiesReducer from './properties/reducer';

export default function createReducer() {
	return combineReducers({
		form,
		auth: authReducer,
		listing: listingReducer,
		properties: propertiesReducer,
	});
}

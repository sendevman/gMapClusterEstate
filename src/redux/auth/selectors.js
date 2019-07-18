import { createSelector } from 'reselect';

const authSelector = state => state.get('auth');
const authTokenSelector = createSelector([authSelector], auth => auth.get('token'));

export {
	authSelector,
	authTokenSelector,
};

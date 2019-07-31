import { createSelector } from 'reselect';

const propertiesSelector = state => state.get('properties');
const propertySelector = createSelector([propertiesSelector], listing => listing.get('property').toJS());

export {
	propertiesSelector,
	propertySelector,
};

import { createSelector } from 'reselect';

const listingSelector = state => state.get('listing');
const listingItemsSelector = createSelector([listingSelector], stocks => stocks.get('listItems').toJS());

export {
	listingSelector,
	listingItemsSelector,
};

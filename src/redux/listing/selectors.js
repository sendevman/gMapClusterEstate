import { createSelector } from 'reselect';

const listingSelector = state => state.get('listing');
const listSelector = createSelector([listingSelector], listing => listing.get('list'));
const idlistSelector = createSelector([listingSelector], listing => listing.get('id_list'));

const listCountriesSelector = createSelector([listSelector], list => list.get('countries').toJS());
const listRegionsSelector = createSelector([listSelector], list => list.get('regions').toJS());
const listCitiesSelector = createSelector([listSelector], list => list.get('cities').toJS());
const listPropertiesSelector = createSelector([listSelector], list => list.get('properties').toJS());

const idlistRegionsSelector = createSelector([idlistSelector], list => list.get('regions').toJS());
const idlistCitiesSelector = createSelector([idlistSelector], list => list.get('cities').toJS());
const idlistPropertiesSelector = createSelector([idlistSelector], list => list.get('properties').toJS());
const idlistImagesSelector = createSelector([idlistSelector], list => list.get('images').toJS());

export {
	listingSelector,
	listSelector,
	idlistSelector,
	listCountriesSelector,
	listRegionsSelector,
	listCitiesSelector,
	listPropertiesSelector,
	idlistRegionsSelector,
	idlistCitiesSelector,
	idlistPropertiesSelector,
	idlistImagesSelector,
};

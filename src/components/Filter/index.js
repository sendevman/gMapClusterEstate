import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
	listCountriesSelector,
	idlistRegionsSelector,
	idlistCitiesSelector,
	idlistPropertiesSelector,
} from '../../redux/listing/selectors';
import { getListID } from '../../redux/listing/actions';

import filter from '../../assets/img/filter.png';

import './style.css';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterView: false,
			filterFav: false,
		};
	}

	searchString = (event) => {
		const searchKey = event.target.value;
		const data = _.filter(this.props.parentProperties, item => item.address1.toLowerCase().includes(searchKey.toLowerCase()));
		if (searchKey !== '') {
			this.props.searchProperties(data);
		} else {
			this.props.searchProperties(this.props.properties);
		}
	}

	filter = (event) => {
		this.setState({ filterView: !this.state.filterView });
		this.props.setFilterView();
	}

	onChangeFilterFav = (event) => {
		this.props.filterFavChange(!this.state.filterFav);
		this.setState({ filterFav: !this.state.filterFav });
	}

	selectOption = (ftype, stype, event) => {
		this.props.getListID(localStorage.getItem('token'), stype, parseInt(event.target.value), ftype);
		if (stype === 'properties') {
			this.setState({ filterFav: false });
		}
	}

	render() {
		const { filterView, filterFav } = this.state;
		const { countries, citiest, regions } = this.props;
		return (
			<div className="filter-view">
				<div style={{ display: 'flex' }}>
					<div className="search-view">
						<input className="search-input" placeholder="Search" onKeyUp={this.searchString} />
						<img className="search-icon" src={filter} alt="filter" />
					</div>
					<button className="filter-btn-view" onClick={this.filter}>
						<img className="filter-icon" src={filter} alt="filter" />
						<div className="filter-btn">Filters</div>
					</button>
				</div>
				{filterView && <div className="filter-container">
					<div>
						<div className="select-container">
							<label className="country-title">Countries</label>
							<select className="country-select" defaultValue="Country" onChange={(event) => this.selectOption('country', 'regions', event)}>
								<option disabled>Country</option>
								{countries.map((item, index) =>
									<option
										className="select-option"
										key={index}
										value={item.id}
									>
										{item.name}
									</option>)}
							</select>
						</div>
						<div className="select-container">
							<label className="region-title">Regions</label>
							<select className="region-select" defaultValue="Region" onChange={(event) => this.selectOption('region', 'cities', event)}>
								<option disabled>Region</option>
								{regions.map((item, index) =>
									<option
										className="select-option"
										key={index}
										value={item.id}
									>
										{item.name}
									</option>)}
							</select>
						</div>
						<div className="select-container">
							<label className="city-title">Cities</label>
							<select className="city-select" defaultValue="City" onChange={(event) => this.selectOption('city', 'properties', event)}>
								<option disabled>City</option>
								{citiest.map((item, index) =>
									<option
										className="select-option"
										key={index}
										value={item.id}
									>
										{item.name}
									</option>)}
							</select>
						</div>
					</div>
					<div className="fav-filter">
						<input type="checkbox" checked={filterFav} onChange={this.onChangeFilterFav} />
						Favorite
					</div>
				</div>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	countries: listCountriesSelector(state),
	regions: idlistRegionsSelector(state),
	citiest: idlistCitiesSelector(state),
	properties: idlistPropertiesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getListID: (token, fType, id, sType) => dispatch(getListID(token, fType, id, sType)),
});

Filter.propTypes = {
	countries: PropTypes.array.isRequired,
	regions: PropTypes.array.isRequired,
	citiest: PropTypes.array.isRequired,
	properties: PropTypes.array.isRequired,
	parentProperties: PropTypes.array.isRequired,
	setFilterView: PropTypes.func.isRequired,
	searchProperties: PropTypes.func.isRequired,
	filterFavChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

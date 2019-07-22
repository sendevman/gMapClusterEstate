import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
	listCountriesSelector,
	listRegionsSelector,
	listCitiesSelector,
	idlistPropertiesSelector,
} from '../../redux/listing/selectors';
import { getList } from '../../redux/listing/actions';

import filter from '../../assets/img/filter.png';

import './style.css';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterView: false,
		};
	}

	searchString = (event) => {
		const searchKey = event.target.value;
		const data = _.filter(this.props.properties, item => item.address1.toLowerCase().includes(searchKey.toLowerCase()));
		this.props.searchProperties(data);
	}

	filter = (event) => {
		this.setState({ filterView: !this.state.filterView });
	}

	render() {
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
			</div>
		);
	}
}

const mapStateToProps = state => ({
	countries: listCountriesSelector(state),
	regions: listRegionsSelector(state),
	citiest: listCitiesSelector(state),
	properties: idlistPropertiesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getList: (token, type) => dispatch(getList(token, type)),
});

Filter.propTypes = {
	properties: PropTypes.array,
	searchProperties: PropTypes.func.isRequired,
};

Filter.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

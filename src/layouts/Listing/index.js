import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Navbar from '../../components/Navbar';
import Filter from '../../components/Filter';
import Property from '../../components/Property';
import GMap from '../../components/GMap';

import { getList, getListID, getData } from '../../redux/listing/actions';
import {
	listCountriesSelector,
	listPropertiesSelector,
	idlistPropertiesSelector,
	idlistCitiesSelector,
	idlistRegionsSelector,
} from '../../redux/listing/selectors';

import './style.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeProperty: null,
			properties: [],
			preProperties: [],
		};
	}

	static getDerivedStateFromProps(props, state) {
		if ((_.isEqual(props.properties, state.preProperties)) === false) {
			return {
				preProperties: props.properties,
				properties: props.properties,
			}
		}
		return {}
	}

	componentDidMount() {
		// this.props.getList(localStorage.getItem('token'), 'cities');
		this.props.getList(localStorage.getItem('token'), 'countries');
		// this.props.getList(localStorage.getItem('token'), 'properties');
		// this.props.getList(localStorage.getItem('token'), 'regions');
		// this.props.getListID(localStorage.getItem('token'), 'images', 1, 'property');
		// this.props.getListID(localStorage.getItem('token'), 'cities', 31, 'region');
		this.props.getListID(localStorage.getItem('token'), 'properties', 3171, 'city');
		// this.props.getData(localStorage.getItem('token'), 'properties/tools/search');
	}

	activeProperty = (number) => {
		this.setState({ activeProperty: number });
	}

	unActiveProperty = () => {
		this.setState({ activeProperty: null });
	}

	searchProperties = (data) => {
		this.setState({
			properties: data,
			childProperties: data,
		});
	}

	filterFavChange = (fav) => {
		const { properties } = this.state;
		let newProperties = [];
		if (fav) {
			if (localStorage.getItem('fav') === null) {
				this.setState({ properties: [] });
			} else {
				_.each(properties, property =>{
					_.each(JSON.parse(localStorage.getItem('fav')), item => {
						if (property.id === item) {
							newProperties.push(property);
						}
					})
				})
				this.setState({ properties: newProperties });
			}
		} else {
			this.setState({ properties: this.state.childProperties });
		}
	}

	render() {
		const { list } = this.props;
		const { activeProperty, properties } = this.state;
		return (
			<div className="listing-view">
				<Navbar history={this.props.history} location={this.props.location} />
				<div className="map-list-view">
					<div className="map-view">
						<GMap properties={properties} active={activeProperty} />
					</div>
					<div className="list-view">
						<Filter
							parentProperties={properties}
							searchProperties={this.searchProperties}
							filterFavChange={this.filterFavChange}
						/>
						<div className="list-view-title">{`Showing ${list.length} matching homes`}</div>
						<div className="property-view">
							{properties.map((item, index) =>
								<Property
									key={index}
									property={item}
									activeProperty={() => this.activeProperty(item.id)}
									unActiveProperty={() => this.unActiveProperty()}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	list: listCountriesSelector(state),
	properties: idlistPropertiesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getList: (token, type) => dispatch(getList(token, type)),
	getListID: (token, fType, id, sType) => dispatch(getListID(token, fType, id, sType)),
	getData: (token, url) => dispatch(getData(token, url)),
});

Home.propTypes = {
	list: PropTypes.array,
	properties: PropTypes.array,
	getList: PropTypes.func.isRequired,
	getListID: PropTypes.func.isRequired,
	getData: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

Home.defaultProps = {
	list: [],
	properties: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

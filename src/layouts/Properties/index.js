import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Slider from '../../components/Slider';

import { getProperty } from '../../redux/properties/actions';
import {
	propertySelector,
} from '../../redux/properties/selectors';

import favor from '../../assets/img/hard.png';
import bfavor from '../../assets/img/bluehard.png';

import './style.css';

class Properties extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialDown: 0,
			overValue: 0,
			fav: JSON.parse(localStorage.getItem('fav')),
		};
	}

	componentDidMount() {
		this.props.getProperty(localStorage.getItem('token'), this.props.match.params.id);
	}

	favClick = (property) => {
		const { fav } = this.state;
		if (_.findIndex(fav, item => item === property.id) > -1) {
			localStorage.setItem('fav', JSON.stringify(_.filter(JSON.parse(localStorage.getItem('fav')), item => item !== property.id)));
		} else {
			if (localStorage.getItem('fav') === null) {
				localStorage.setItem('fav', JSON.stringify([property.id]));
			} else {
				localStorage.setItem('fav', JSON.stringify(JSON.parse(localStorage.getItem('fav')).concat([property.id])));
			}
		}
		this.setState({
			fav: JSON.parse(localStorage.getItem('fav')),
		})
	}

	render() {
		const { history, location, property } = this.props;
		const { fav } = this.state;
		return (
			<div className="properties-page-view">
				<Navbar history={history} location={location} />
				{property.address1 && <div className="properties-container">
					<Slider property={property} />
					<Sidebar property={property} />
					<div className="properties-data-container">
						<div className="address word-break">
							{property.address1}
							<div className="properties-fav" onClick={() => this.favClick(property)}>
								<img src={(fav.length > 0 && _.findIndex(fav, item => item === property.id) > -1) ? bfavor : favor} alt="" />
							</div>
						</div>
						<div className="address word-break">{property.address2}</div>
						<div className="bed-bath-size word-break">
							{`${property.beds} beds ${property.baths} baths ${property.buildingSize}m`}
						</div>
						<div className="description word-break">
							{property.description}
						</div>
						<div className="mid-border"></div>
						<div className="mid-title">Facts & Features</div>
						<div className="mid-container">
							<div className="mid-container-item">
								<div className="mid-container-item-title">Type</div>
								<div className="mid-container-item-content">{property.type}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Certificate</div>
								<div className="mid-container-item-content">{property.certificate}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Building Size</div>
								<div className="mid-container-item-content">{property.buildingSize}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Land Size</div>
								<div className="mid-container-item-content">{property.landSize}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Parking</div>
								<div className="mid-container-item-content">
									{
										_.findIndex(property.Details, item => item.meta_key === 'parking') > -1
										? property.Details[_.findIndex(property.Details, item => item.meta_key === 'parking')].meta_value
										: 'n/a'
									}
								</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Year Built</div>
								<div className="mid-container-item-content">
									{
										_.findIndex(property.Details, item => item.meta_key === 'yearBuilt') > -1
										? property.Details[_.findIndex(property.Details, item => item.meta_key === 'yearBuilt')].meta_value
										: 'n/a'
									}
								</div>
							</div>
						</div>
						<div className="mid-border"></div>
						<div className="mid-title">Interior Features</div>
						<div className="mid-container">
							<div className="mid-container-item">
								<div className="mid-container-item-title">Bedrooms / Bathrooms</div>
								<ul>
									<li className="mid-container-item-content">{`Beds: ${property.beds}`}</li>
									<li className="mid-container-item-content">{`Baths: ${property.baths}`}</li>
									<li className="mid-container-item-content">{`Master: ${property.masters ? property.masters : 'n/a'}`}</li>
								</ul>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Other</div>
								<ul>
									<li className="mid-container-item-content">
										{`Electricity: ${
											_.findIndex(property.Details, item => item.meta_key === 'electricity') > -1
											? property.Details[_.findIndex(property.Details, item => item.meta_key === 'electricity')].meta_value
											: 'n/a'
										}`}
									</li>
									<li className="mid-container-item-content">
										{`Floors: ${
											_.findIndex(property.Details, item => item.meta_key === 'floors') > -1
											? property.Details[_.findIndex(property.Details, item => item.meta_key === 'floors')].meta_value
											: 'n/a'
										}`}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	property: propertySelector(state),
});

const mapDispatchToProps = dispatch => ({
	getProperty: (token, id) => dispatch(getProperty(token, id)),
});

Properties.propTypes = {
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getProperty: PropTypes.func.isRequired,
	property: PropTypes.object.isRequired,
};

Properties.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Navbar from '../../components/Navbar';

import { IMGPATH } from '../../redux/config';

import { getProperty } from '../../redux/properties/actions';
import {
	propertySelector,
} from '../../redux/properties/selectors';

import './style.css';

class Properties extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	static getDerivedStateFromProps(props, state) {
		// if ((_.isEqual(props.property, state.preProperties)) === false) {
		// 	return {

		// 	}
		// }
		return {}
	}

	componentDidMount() {
		this.props.getProperty(localStorage.getItem('token'), this.props.match.params.id);
	}


	render() {
		const { history, location, property } = this.props;
		console.log(property);
		return (
			<div className="properties-page-view">
				<Navbar history={history} location={location} />
				{property.address1 && <div className="properties-container">
					<div className="properties-image-slider">
						<img className="properties-slider-image" src={property.Images ? `${IMGPATH}/${property.Images[0].url}` : ''} alt="" />
					</div>
					<div className="properties-side-bar">
					</div>
					<div className="properties-data-container">
						<div className="address word-break">{property.address1}</div>
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
								<div className="mid-container-item-title">Year Built</div>
								<div className="mid-container-item-content">
									{
										_.findIndex(property.Details, item => item.meta_key === 'yearBuilt') > -1
										? property.Details[_.findIndex(property.Details, item => item.meta_key === 'yearBuilt')].meta_value
										: 'n/a'
									}
								</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Heating & Cooling</div>
								<div className="mid-container-item-content">{'n/a'}</div>
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
								<div className="mid-container-item-title">Price per foot</div>
								<div className="mid-container-item-content">
									{
										_.findIndex(property.Details, item => item.meta_key === 'floors') > -1
										? property.Details[_.findIndex(property.Details, item => item.meta_key === 'floors')].meta_value
										: 'n/a'
									}
								</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Lot size</div>
								<div className="mid-container-item-content">{'n/a'}</div>
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
								<div className="mid-container-item-title">Rooms & Other</div>
								<ul>
									<li className="mid-container-item-content">Basement</li>
									<li className="mid-container-item-content">Bedroom</li>
									<li className="mid-container-item-content">Full Bath</li>
								</ul>
							</div>
						</div>
					</div>
					{/* <div className="price">
						<NumberFormat
							thousandSeparator={true}
							decimalSeparator={'.'}
							prefix={'IDR '}
							value={numConverting(property.purchasePrice).value}
							displayType={'text'}
							renderText={value => <div>{value}{numConverting(property.purchasePrice).unit}</div>}
						/>
					</div> */}

					{/* <div className="mid-border"></div>
					<div className="down-price">
						<NumberFormat
							thousandSeparator={true}
							decimalSeparator={'.'}
							prefix={'IDR '}
							value={numConverting(property.purchasePrice).value}
							displayType={'text'}
							renderText={value => <div>{value}{numConverting(property.purchasePrice).unit} down payment</div>}
						/>
					</div>
					<div className="rent-price">
						<NumberFormat
							thousandSeparator={true}
							decimalSeparator={'.'}
							prefix={'IDR '}
							value={numConverting(property.rentPrice).value}
							displayType={'text'}
							renderText={value => <div>{value}{numConverting(property.rentPrice).unit} rent per month</div>}
						/>
					</div> */}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
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
			initialDown: 0,
		};
	}

	componentDidMount() {
		this.props.getProperty(localStorage.getItem('token'), this.props.match.params.id);
	}

	onChangeInit = (event) => {
		this.setState({
			initialDown: event.target.value,
		});
	}

	render() {
		const { history, location, property } = this.props;
		const { initialDown } = this.state;
		return (
			<div className="properties-page-view">
				<Navbar history={history} location={location} />
				{property.address1 && <div className="properties-container">
					<div className="properties-image-slider">
						<img className="properties-slider-image" src={property.Images ? `${IMGPATH}/${property.Images[0].url}` : ''} alt="" />
					</div>
					<div className="properties-side-bar">
						<div className="sale-monthly">
							<div className="for-sale">
								<div className="title">For sale</div>
								<div className="content">
									<NumberFormat
										thousandSeparator = {'.'}
										decimalSeparator={','}
										prefix={'Rp. '}
										value={property.purchasePrice}
										displayType={'text'}
									/>
								</div>
							</div>
							<div className="for-monthly">
								<div className="title">Monthly payment</div>
								<div className="content">
									<NumberFormat
										thousandSeparator = {'.'}
										decimalSeparator={','}
										prefix={'Rp. '}
										value={property.rentPrice}
										displayType={'text'}
									/>
								</div>
							</div>
						</div>
						<div className="payment">
							<div className="payment-item">
								<div className="payment-item-title">
									<div className="payment-point"></div>
									Initial down payment
								</div>
								<div className="payment-item-content">
									<input style={{ width: '250px' }} className="" type="number" onChange={this.onChangeInit} defaultValue={parseInt(property.purchasePrice * Math.pow(1.055, 3) * 0.02)} min={`${parseInt(property.purchasePrice * Math.pow(1.055, 3) * 0.02)}`} max={`${property.purchasePrice * Math.pow(1.055, 3) * 0.1}`} />
								</div>
							</div>
							<div className="payment-item">
								<div className="payment-item-title">
									<div className="payment-point"></div>
									Year 1 payments
								</div>
								<div className="payment-item-content">
									<NumberFormat
										thousandSeparator = {'.'}
										decimalSeparator={','}
										prefix={'Rp. '}
										value={parseInt((property.purchasePrice * Math.pow(1.055, 3) * 0.15 - initialDown) / 36)}
										displayType={'text'}
										renderText={value =>
											<div style={{ width: '100%' }}>
												<span style={{ display: 'inline-block' }}>{`Rp. ${property.rentPrice} +`}</span>
												<div style={{ display: 'inline-block', color: '#2ECC71', paddingLeft: '5px' }}>{`${value} equity`}</div>
												<span style={{ display: 'inline-block' }}>{'/mo'}</span>
											</div>
										}
									/>
								</div>
							</div>
							<div className="payment-item">
								<div className="payment-item-title">
									<div className="payment-point"></div>
									Year 2 payments
								</div>
								<div className="payment-item-content">
									<NumberFormat
										thousandSeparator = {'.'}
										decimalSeparator={','}
										prefix={'Rp. '}
										value={parseInt((property.purchasePrice * Math.pow(1.055, 3) * 0.15 - initialDown) / 36)}
										displayType={'text'}
										renderText={value =>
											<div style={{ width: '100%' }}>
												<span style={{ display: 'inline-block' }}>{`Rp. ${property.rentPrice * Math.pow(1.055, 1)} +`}</span>
												<div style={{ display: 'inline-block', color: '#2ECC71', paddingLeft: '5px' }}>{`${value} equity`}</div>
												<span style={{ display: 'inline-block' }}>{'/mo'}</span>
											</div>
										}
									/>
								</div>
							</div>
							<div className="payment-item">
								<div className="payment-item-title">
									<div className="payment-point"></div>
									Year 3 payments
								</div>
								<div className="payment-item-content">
									<NumberFormat
										thousandSeparator = {'.'}
										decimalSeparator={','}
										prefix={'Rp. '}
										value={parseInt((property.purchasePrice * Math.pow(1.055, 3) * 0.15 - initialDown) / 36)}
										displayType={'text'}
										renderText={value =>
											<div style={{ width: '100%' }}>
												<span style={{ display: 'inline-block' }}>{`Rp. ${parseInt(property.rentPrice * Math.pow(1.055, 2))} +`}</span>
												<div style={{ display: 'inline-block', color: '#2ECC71', paddingLeft: '5px' }}>{`${value} equity`}</div>
												<span style={{ display: 'inline-block' }}>{'/mo'}</span>
											</div>
										}
									/>
								</div>
							</div>
							<div className="payment-item">
								<div className="payment-item-title">
									<div className="payment-point"></div>
									After three years
								</div>
								<div className="payment-item-content-no-border">
									<NumberFormat
										thousandSeparator = {'.'}
										decimalSeparator={','}
										prefix={'Rp. '}
										value={parseInt(property.purchasePrice * Math.pow(1.055, 3) * 0.15)}
										displayType={'text'}
										renderText={value =>
											<div style={{ fontWeight: 'bold', color: '#2ECC71' }}>{`${value} cash back`}</div>
										}
									/>
								</div>
							</div>
						</div>
						<div className="house-price">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'House purchase price of Rp/'}
								value={parseInt(property.purchasePrice * Math.pow(1.055, 3))}
								displayType={'text'}
							/>
						</div>
						<div className="you-choose">You choose</div>
						<div className="buy-sell">
							<div className="for-buy">
								<div className="title">Buy</div>
								<div className="content">Put Rp. 120.000.000 down toward mortgage</div>
							</div>
							<div className="mid-gap">
								<div className="mid-v-border"></div>
								<div className="mid-or">OR</div>
								<div className="mid-v-border"></div>
							</div>
							<div className="for-sell">
								<div className="title">Sell</div>
								<div className="content">Cash out your ownership at ~ Rp. 900.000.00</div>
							</div>
						</div>
						<button className="schedule">Click to schedule a private tour</button>
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

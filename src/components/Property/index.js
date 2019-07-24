import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

import { IMGPATH } from '../../redux/config';

import favor from '../../assets/img/hard.png';
import bfavor from '../../assets/img/bluehard.png';

import './style.css';

const numConverting = (value) => {
	if (value / 1000000000 === parseInt(value / 1000000000)) {
		return { value: value / 1000000000, unit: 'M' };
	} else if (value / 1000000 === parseInt(value / 1000000)) {
		return { value: value / 1000000, unit: 'Jt' };
	}
	return { value, unit: '' };
}

class Property extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fav: JSON.parse(localStorage.getItem('fav')),
		};
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
		const { property, activeProperty, unActiveProperty } = this.props;
		const { fav } = this.state;
		return (
			<div className="property-view-container" onMouseOver={activeProperty} onMouseLeave={unActiveProperty}>
				<div className="property-image-slider">
					<img className="property-image" src={`${IMGPATH}/${property.Images[0].url}`} alt="" />
					<div className="property-fav-container" onClick={() => this.favClick(property)}>
						<img className="property-fav-icon" src={(fav.length > 0 && _.findIndex(fav, item => item === property.id) > -1) ? bfavor : favor} alt="" />
					</div>
				</div>
				<div className="property-data-container">
					<div className="address">{property.address1}</div>
					<div className="price">
						<NumberFormat
							thousandSeparator={true}
							decimalSeparator={'.'}
							prefix={'IDR '}
							value={numConverting(property.purchasePrice).value}
							displayType={'text'}
							renderText={value => <div>{value}{numConverting(property.purchasePrice).unit}</div>}
						/>
					</div>
					<div className="bed-bath-size">
						{`${property.beds} beds ${property.baths} baths ${property.buildingSize}m`}
					</div>
					<div className="mid-border"></div>
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
					</div>
				</div>
			</div>
		);
	}
}

Property.propTypes = {
	property: PropTypes.object.isRequired,
	activeProperty: PropTypes.func.isRequired,
	unActiveProperty: PropTypes.func.isRequired,
};

Property.defaultProps = {
};

export default Property;

import React from 'react';
import PropTypes from 'prop-types';

import { IMGPATH } from '../../redux/config';

import favor from '../../assets/img/hard.png';

import './style.css';

class Property extends React.Component {
	render() {
		const { property, activeProperty, unActiveProperty } = this.props;
		return (
			<div className="property-view-container" onMouseOver={activeProperty} onMouseLeave={unActiveProperty}>
				<div className="property-image-slider">
					<img className="property-image" src={`${IMGPATH}/${property.Images[0].url}`} alt="" />
					<div className="property-fav-container">
						<img className="property-fav-icon" src={favor} alt="" />
					</div>
				</div>
				<div className="property-data-container">
					<div className="address">{property.address1}</div>
					<div className="price">{`IDR ${property.purchasePrice}`}</div>
					<div className="bed-bath-size">{`${property.beds} beds ${property.baths} baths ${property.buildingSize}ft`}</div>
					<div className="mid-border"></div>
					<div className="down-price">{`IDR ${property.purchasePrice} down payment`}</div>
					<div className="rent-price">{`IDR ${property.rentPrice} rent per month`}</div>
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

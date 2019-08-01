import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { IMGPATH } from '../../redux/config';
import './style.css';

class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	
	render() {
		const { property } = this.props;
		return (
			<div className="properties-image-slider">
				<Carousel>
					{property.Images && property.Images.map((item, index) => (
						<div key={index} style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', maxHeight: '450px' }}>
							<img className="properties-slider-image" src={property.Images ? `${IMGPATH}/${item.url}` : ''} alt="" />
						</div>
					))}
				</Carousel>
			</div>
		);
	}
}

Slider.propTypes = {
	property: PropTypes.object.isRequired,
};

export default Slider;

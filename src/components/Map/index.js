import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import { GOOGLEAPIKEY } from '../../redux/config';

import './style.css';

const AnyReactComponent = ({ cName, text }) => <div className={cName}>{text}</div>;

class Map extends React.Component {
	render() {
		const { center, zoom, properties, active } = this.props;
		return (
			<GoogleMapReact
				bootstrapURLKeys={{ key: GOOGLEAPIKEY }}
				defaultCenter={center}
				defaultZoom={zoom}
			>
				{properties.map((item, index) =>
					<AnyReactComponent
						key={index}
						lat={item.latitude}
						lng={item.longitude}
						text="My Marker"
						cName={active === index ? "map_marker active" : "map_marker"}
					/>
				)}

			</GoogleMapReact>
		);
	}
}

Map.propTypes = {
	properties: PropTypes.array,
	active: PropTypes.number,
	center: PropTypes.object,
	zoom: PropTypes.number,
};

Map.defaultProps = {
	center: {
		lat: -6.232121,
		lng: 106.807562,
	},
	zoom: 16,
	properties: [],
	active: null,
};

export default Map;

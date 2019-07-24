import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import NumberFormat from 'react-number-format';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from '../ClusterMarker';

const numConverting = (value) => {
	if (value / 1000000000 === parseInt(value / 1000000000)) {
		return { value: value / 1000000000, unit: 'M' };
	} else if (value / 1000000 === parseInt(value / 1000000)) {
		return { value: value / 1000000, unit: 'Jt' };
	}
	return { value, unit: '' };
}

export const simpleMarker = ({
  active, price, defaultMotionStyle, motionStyle,
}) => (
  <Motion
    defaultStyle={defaultMotionStyle}
    style={motionStyle}
  >
  {
    ({ scale }) => (
      <div
				className={active ? "map_marker active" : "map_marker"}
        style={{
          transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
        }}
      >
				<NumberFormat
					thousandSeparator={true}
					decimalSeparator={'.'}
					prefix={'IDR '}
					value={numConverting(price).value}
					displayType={'text'}
					renderText={value => <div style={{ whiteSpace: 'nowrap' }}>{`${value}${numConverting(price).unit}`}</div>}
				/>
      </div>
    )
  }
  </Motion>
);

export const simpleMarkerHOC = compose(
  defaultProps({
    initialScale: 0.3,
    defaultScale: 1,
		hoveredScale: 0.7,
		active: false,
		price: 0,
  }),
  clusterMarkerHOC
);

export default simpleMarkerHOC(simpleMarker);

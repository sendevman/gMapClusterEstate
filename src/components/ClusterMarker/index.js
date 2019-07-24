import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { Motion, spring } from 'react-motion';

import './style.css';

export const clusterMarker = ({
  text,
  defaultMotionStyle, motionStyle,
}) => (
  <Motion
    defaultStyle={defaultMotionStyle}
    style={motionStyle}
  >
  {
    ({ scale }) => (
      <div
        className="cluster-marker"
        style={{
          transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
        }}
      >
        <div
          className="cluster-text"
        >
          {text}
        </div>
      </div>
    )
  }
  </Motion>
);

export const clusterMarkerHOC = compose(
  defaultProps({
    text: '0',
    initialScale: 0.6,
    defaultScale: 1,
    hoveredScale: 1.15,
    hovered: false,
    stiffness: 320,
    damping: 7,
    precision: 0.001,
  }),
  pure,
  withPropsOnChange(
    ['initialScale'],
    ({ initialScale, defaultScale, $prerender }) => ({
      initialScale,
      defaultMotionStyle: { scale: $prerender ? defaultScale : initialScale },
    })
  ),
  withPropsOnChange(
    ['hovered'],
    ({
      hovered, hoveredScale, defaultScale,
      stiffness, damping, precision,
    }) => ({
      hovered,
      motionStyle: {
        scale: spring(
          hovered ? hoveredScale : defaultScale,
          { stiffness, damping, precision }
        ),
      },
    })
  )
);

export default clusterMarkerHOC(clusterMarker);

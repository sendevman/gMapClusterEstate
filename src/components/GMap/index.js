import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import GoogleMapReact from 'google-map-react';
import ClusterMarker from '../ClusterMarker';
import SimpleMarker from '../SimpleMarker';
import supercluster from 'points-cluster';
import { GOOGLEAPIKEY } from '../../redux/config';
import { getCoordinateProperty } from '../../redux/listing/actions';

export const gMap = ({
  hoverDistance, options,
  mapProps: { center, zoom },
  onChange, onChildMouseEnter, onChildMouseLeave,
  mobilehovered,
  clusters,
}) => (
  <GoogleMapReact
		bootstrapURLKeys={{ key: GOOGLEAPIKEY }}
    options={options}
    hoverDistance={hoverDistance}
    center={center}
    zoom={zoom}
    onChange={onChange}
    onChildMouseEnter={(hoverKey, { id }) => onChildMouseEnter(hoverKey, { id }, clusters)}
    onChildMouseLeave={onChildMouseLeave}
  >
    {
      clusters
        .map(cluster => 
					cluster.numPoints === 1
            ? <SimpleMarker key={cluster.id} {...cluster} />
            : <ClusterMarker key={cluster.id} {...cluster} />
				)
    }
  </GoogleMapReact>
)

const mapDispatchToProps = dispatch => ({
	getList: (token, data) => dispatch(getCoordinateProperty(token, data)),
});

export const gMapHOC = compose(
  connect(null, mapDispatchToProps),
  defaultProps({
    clusterRadius: 60,
    hoverDistance: 30,
    options: {
      minZoom: 3,
      maxZoom: 20,
    },
		properties: [],
    active: null,
    mobilehovered: () => {},
    getList: () => {},
  }),
  withState(
    'markers',
    'setMarkers',
		[]
  ),
  withState(
    'hoveredMarkerId',
    'setHoveredMarkerId',
    -1
  ),
  withState(
    'mapProps',
    'setMapProps',
    {
			center: {
				lat: -6.232121,
				lng: 106.807562,
			},
      zoom: 10,
    }
  ),
  withState(
    'initUpdate',
    'setInitUpdate',
		true
  ),
  withHandlers({
    onChange: ({ setMapProps, getList, initUpdate, setInitUpdate }) => ({ center, zoom, bounds }) => {
      if (initUpdate) {
        setInitUpdate(false);
      } else {
        const rootWidth = document.getElementById('root').getBoundingClientRect().width;
        let mapViewWidth = 0;
        if (rootWidth > 450) {
          mapViewWidth = document.getElementsByClassName('map-view')[0].getBoundingClientRect().width;
        } else {
          const element = document.getElementsByClassName('mmap-view');
          if (element.length > 0) {
            mapViewWidth = document.getElementsByClassName('mmap-view')[0].getBoundingClientRect().width;
          }
        }
        
        const radius = 156543.03392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom) * mapViewWidth / 1000;
        getList(localStorage.getItem('token'), { lat: center.lat, lng: center.lng, radius });
      }
      setMapProps({ center, zoom, bounds });
    },

    onChildMouseEnter: ({ setHoveredMarkerId, mobilehovered }) => (hoverKey, { id }, clusters) => {
      setHoveredMarkerId(id);
    },

    onChildMouseLeave: ({ setHoveredMarkerId, mobilehovered }) => () => {
      setHoveredMarkerId(-1);
    },
  }),
  withPropsOnChange(
    ['markers'],
    ({ markers = [], clusterRadius, options: { minZoom, maxZoom } }) => {

			const simpleMarkers = markers.map(item => ({
				id: item.id,
				lat: parseFloat(item.latitude),
				lng: parseFloat(item.longitude),
				price: item.purchasePrice,
			}))

			return ({
				getCluster: supercluster(
					simpleMarkers,
					{
						minZoom,
						maxZoom,
						radius: clusterRadius,
					}
				),
			});
		}
  ),
  withPropsOnChange(
    ['mapProps', 'getCluster', 'mobilehovered'],
    ({ mapProps, getCluster, mobilehovered }) => ({
      clusters: mapProps.bounds
				? getCluster(mapProps)
          .map(({ x, y, wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            text: numPoints,
            numPoints,
						id: `${numPoints}_${points[0].id}`,
						original_id: points[_.findIndex(points, point => point.lng === x && point.lat === y)].id,
            price: points[_.findIndex(points, point => point.lng === x && point.lat === y)].price,
            mobilehovered,
          }))
			  : [],
		})
  ),
  withPropsOnChange(
    ['clusters', 'hoveredMarkerId', 'active'],
    ({ clusters, hoveredMarkerId, active }) => ({
      clusters: clusters
        .map(cluster => ({
          ...cluster,
					hovered: cluster.id === hoveredMarkerId,
          active: parseInt(active) === cluster.original_id,
        })),
    })
	),
	withPropsOnChange(
    ['properties'],
    ({ properties, setMarkers }) => ({
      markers: setMarkers(properties)
		})
	),
);

export default gMapHOC(gMap);

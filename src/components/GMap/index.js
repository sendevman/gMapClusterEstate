import React from 'react';
import _ from 'lodash';
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

export const gMap = ({
  hoverDistance, options,
  mapProps: { center, zoom },
  onChange, onChildMouseEnter, onChildMouseLeave,
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

export const gMapHOC = compose(
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
  withHandlers({
    onChange: ({ setMapProps }) => ({ center, zoom, bounds }) => {
      setMapProps({ center, zoom, bounds });
    },

    onChildMouseEnter: ({ setHoveredMarkerId, mobilehovered }) => (hoverKey, { id }, clusters) => {
      mobilehovered(clusters[_.findIndex(clusters, cluster => cluster.id === id)]);
      setHoveredMarkerId(id);
    },

    onChildMouseLeave: ({ setHoveredMarkerId, mobilehovered }) => () => {
      mobilehovered(null);
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
    ['mapProps', 'getCluster'],
    ({ mapProps, getCluster }) => ({
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

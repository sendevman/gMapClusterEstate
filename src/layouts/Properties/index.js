import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Slider from '../../components/Slider';
import PropertyData from '../../components/PropertyData';

import { getProperty } from '../../redux/properties/actions';
import { propertySelector } from '../../redux/properties/selectors';

import './style.css';

class Properties extends Component {
	componentDidMount() {
		this.props.getProperty(localStorage.getItem('token'), this.props.match.params.id);
	}

	render() {
		const { history, location, property } = this.props;

		return (
			<div className="properties-page-view">
				<Navbar history={history} location={location} />
				{property.address1 && <div className="properties-container">
					<Slider property={property} />
					<Sidebar property={property} />
					<PropertyData property={property} />
					<button className="schedule">Click to schedule a private tour</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Properties);

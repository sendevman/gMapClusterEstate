import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';


import { getList } from '../../redux/listing/actions';
import { listingItemsSelector } from '../../redux/listing/selectors';

class Home extends Component {
	componentDidMount() {
		// this.props.getList(localStorage.getItem('token'), 'cities');
		// this.props.getList(localStorage.getItem('token'), 'countries');
		// this.props.getList(localStorage.getItem('token'), 'properties');
		// this.props.getList(localStorage.getItem('token'), 'regions');
		// this.props.getList(localStorage.getItem('token'), 'images/1/property');
	}

	render() {
		return (
			<div>
				<Navbar history={this.props.history} location={this.props.location} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	list: listingItemsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getList: (token, type) => dispatch(getList(token, type)),
});

Home.propTypes = {
	list: PropTypes.object,
	getList: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

Home.defaultProps = {
	list: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

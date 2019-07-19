import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';

import { getList, getListID } from '../../redux/listing/actions';
import { listCitiesSelector, idlistImagesSelector } from '../../redux/listing/selectors';

class Home extends Component {
	componentDidMount() {
		// this.props.getList(localStorage.getItem('token'), 'cities');
		// this.props.getList(localStorage.getItem('token'), 'countries');
		// this.props.getList(localStorage.getItem('token'), 'properties');
		// this.props.getList(localStorage.getItem('token'), 'regions');
		// this.props.getListID(localStorage.getItem('token'), 'images', 1, 'property');
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
	list: listCitiesSelector(state),
	images: idlistImagesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getList: (token, type) => dispatch(getList(token, type)),
	getListID: (token, fType, id, sType) => dispatch(getListID(token, fType, id, sType)),
});

Home.propTypes = {
	list: PropTypes.array,
	images: PropTypes.array,
	getList: PropTypes.func.isRequired,
	getListID: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

Home.defaultProps = {
	list: [],
	images: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

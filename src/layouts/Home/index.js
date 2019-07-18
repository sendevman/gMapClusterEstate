import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';

class Home extends Component {
	render() {
		return (
			<div>
				<Navbar history={this.props.history} location={this.props.location} />
			</div>
		);
	}
}

Home.propTypes = {
	history: PropTypes.object.isRequired,
};

export default Home;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

import { authTokenSelector } from '../../redux/auth/selectors';

class Navbar extends React.Component {
	auth = () => (
		<a href="#" onClick={this.logout}>
			<div>
				<span className="text-black">Log out</span>
			</div>
		</a>
	);

	logout = () => {
		localStorage.removeItem('token');
		this.props.history.push('/login');
	}

	login = () => {
		this.props.history.push('/login');
	}

	signup = () => {
		this.props.history.push('/signup');
	}

	render() {
		const { token, location } = this.props;
		return (
			<div>
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-header">
							<a
								className="navbar-brand"
								href="/"
							>
								<div>TapHomes</div>
							</a>
						</div>
						<ul className="nav navbar-nav navbar-right">
							{token !== '' && <li>
								{this.auth()}
							</li>}
							{location && location.pathname === '/login' && <li>
								<a href="#" onClick={this.signup}>
									<div>
										<span className="text-black">Sign up</span>
									</div>
								</a>
							</li>}
							{location && location.pathname === '/signup' && <li>
								<a href="#" onClick={this.login}>
									<div>
										<span className="text-black">Login</span>
									</div>
								</a>
							</li>}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	token: authTokenSelector(state),
});

Navbar.propTypes = {
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	token: PropTypes.string,
};

Navbar.defaultProps = {
	token: '',
	history: {},
	location: {},
};

export default connect(mapStateToProps, null)(Navbar);

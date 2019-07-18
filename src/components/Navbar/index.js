import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

import { authTokenSelector } from '../../redux/auth/selectors';
import { setToken } from '../../redux/auth/actions';

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
		this.props.setToken('');
		this.props.history.push('/login');
	}

	login = () => {
		this.props.history.push('/login');
	}

	signup = () => {
		this.props.history.push('/signup');
	}

	goHome = () => {
		this.props.history.push('/listingmap')
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
								onClick={this.goHome}
							>
								<div>TapHomes</div>
							</a>
						</div>
						<ul className="nav navbar-nav navbar-right">
							{location && location.pathname === '/listingmap' && <li>
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

const mapDispatchToProps = dispatch => ({
	setToken: (token) => dispatch(setToken(token)),
});

Navbar.propTypes = {
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	setToken: PropTypes.func.isRequired,
	token: PropTypes.string,
};

Navbar.defaultProps = {
	token: '',
	history: {},
	location: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

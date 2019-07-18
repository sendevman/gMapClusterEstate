import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';

import { authLogin } from '../../redux/auth/actions';
import { authTokenSelector } from '../../redux/auth/selectors';

import Navbar from '../../components/Navbar';
import FormInput from '../../components/FormInput';
import './style.css';

class Login extends Component {
	componentWillReceiveProps(nextProps) {
		if (this.props.token !== nextProps.token) {
			localStorage.setItem('token', nextProps.token);
			this.props.history.push('/listingmap');
		}
	}

	login = (data) => {
		const auth = data.toJS();
		this.props.authLogin(auth);
	};

	render() {
		const { handleSubmit, submitting } = this.props;
		return (
			<div>
				<Navbar history={this.props.history} location={this.props.location} />
				<div className="auth-container">
					<form
						onSubmit={handleSubmit(this.login)}
						id="login-form1"
						className="login-form">

						<div className="auth-content">
							<div className="input-wrapper">
								<section>
									<Field
										name="email"
										placeholder="Email Address"
										component={FormInput}
									/>
								</section>
								<section>
									<Field
										name="password"
										type="password"
										placeholder="Password"
										component={FormInput}
									/>
								</section>
								<section>
									<button
										type="submit"
										disabled={submitting}
										className="btn btn-primary btn-submit"
									>
										Log In
									</button>
								</section>

								<section>
									<div className="note">
										<a href="/forgot">Forgot password?</a>
									</div>
								</section>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	submitting: PropTypes.bool,
	token: PropTypes.string,
	authLogin: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	history: PropTypes.object,
};

Login.defaultProps = {
	submitting: false,
	token: '',
	history: {},
};

const mapStateToProps = state => ({
	token: authTokenSelector(state),
});

const mapDispatchToProps = dispatch => ({
	authLogin: (auth) => dispatch(authLogin(auth)),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	reduxForm({
		form: 'LoginForm',
		validate: values => {
			const value = values.toJS();
			const errors = {};
			if (!value.email) errors.email = 'Email is required';
			if (!value.password) errors.password = 'Password is required';
			return errors;
		},
	}),
)(Login);
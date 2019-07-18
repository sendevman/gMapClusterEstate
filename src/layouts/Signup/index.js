import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';

import { authSignup } from '../../redux/auth/actions';
import { authTokenSelector } from '../../redux/auth/selectors';

import Navbar from '../../components/Navbar';
import FormInput from '../../components/FormInput';
import './style.css';

class Signup extends Component {
	componentWillReceiveProps(nextProps) {
		if (this.props.token !== nextProps.token) {
			localStorage.setItem('token', nextProps.token);
			this.props.history.push('/listingmap');
		}
	}

	signup = (data) => {
		const auth = data.toJS();
		console.log(auth);
		this.props.authSignup(auth);
	};

	render() {
		const { handleSubmit, submitting } = this.props;
		return (
			<div>
				<Navbar history={this.props.history} location={this.props.location} />
				<div className="auth-container">
					<form
						onSubmit={handleSubmit(this.signup)}
						id="login-form1"
						className="login-form">

						<div className="auth-content">
							<div className="input-wrapper">
								<section>
									<Field
										name="firstname"
										placeholder="First Name"
										component={FormInput}
									/>
								</section>
								<section>
									<Field
										name="lastname"
										placeholder="Last Name"
										component={FormInput}
									/>
								</section>
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
									<Field
										name="phone"
										type="number"
										placeholder="Phone"
										component={FormInput}
									/>
								</section>
								<section>
									<button
										type="submit"
										disabled={submitting}
										className="btn btn-primary btn-submit"
									>
										Sign up
									</button>
								</section>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Signup.propTypes = {
	submitting: PropTypes.bool,
	token: PropTypes.string,
	authSignup: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	history: PropTypes.object,
};

Signup.defaultProps = {
	submitting: false,
	token: '',
	history: {},
};

const mapStateToProps = state => ({
	token: authTokenSelector(state),
});

const mapDispatchToProps = dispatch => ({
	authSignup: (auth) => dispatch(authSignup(auth)),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	reduxForm({
		form: 'SignupForm',
		validate: values => {
			const value = values.toJS();
			const errors = {};
			if (!value.email) errors.email = 'Email is required';
			if (!value.password) errors.password = 'Password is required';
			if (!value.firstname) errors.firstname = 'First Name is required';
			if (!value.lastname) errors.lastname = 'Last Name is required';
			if (!value.phone) errors.phone = 'Phone number is required';
			return errors;
		},
	}),
)(Signup);
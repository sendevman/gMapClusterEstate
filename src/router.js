import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Listing from './layouts/Listing';
import Login from './layouts/Login';
import Signup from './layouts/Signup';

const AuthRoute = (props) => (
	localStorage.getItem('token') !== null ? (
		<Route {...props} />
	) : (
		<Redirect to="/login" />
	)
);

const GuessRoute = (props) => (
	localStorage.getItem('token') === null ? (
		<Route {...props} />
	) : (
		<Redirect to="/listingmap" />
	)
);

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<GuessRoute exact path="/login" component={Login} />
			<GuessRoute exact path="/signup" component={Signup} />
			<AuthRoute exact path="/listingmap" component={Listing} />
			<Redirect path="/" to="/login" />
		</Switch>
	</BrowserRouter>
);

export default Routes;
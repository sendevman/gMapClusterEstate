import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Listing from './layouts/Listing';
import Properties from './layouts/Properties';
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
			<AuthRoute exact path="/properties/:id" component={Properties} />
			<Redirect path="/" to="/login" />
		</Switch>
	</BrowserRouter>
);

export default Routes;
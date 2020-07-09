// eslint-disable-next-line
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './Actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/layout/Common/privateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './Auth/Login';
import Register from './Auth/Register';
import dashboard from './components/Dashboard/dashboard';

import './App.css';
// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout the user
		store.dispatch(logoutUser);
		// TODO: Clear the current profile

		// Redirect to login
		window.location.href = '/login';
	}
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='App'>
						<Navbar />
						<Route exact path='/' component={Landing} />
						<div className='container'>
							<Route exact path='/register' component={Register} />
						</div>
						<div className='container'>
							<Route exact path='/login' component={Login} />
						</div>
						<div className='container'>
							<Switch>
								<PrivateRoute exact path='/dashboard' component={dashboard} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

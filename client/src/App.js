// eslint-disable-next-line
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './Auth/Login';
import Register from './Auth/Register';

import './App.css';

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
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

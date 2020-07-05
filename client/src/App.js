// eslint-disable-next-line
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './Auth/Login';
import Register from './Auth/Register';

import './App.css';

function App() {
	return (
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
	);
}

export default App;

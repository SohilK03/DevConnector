import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Navbar></Navbar>
			<Landing></Landing>
			<Footer></Footer>
		</div>
	);
}

export default App;

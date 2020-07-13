import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../Actions/authActions';
import { clearCurrentProfile } from '../../Actions/profileActions';

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const guestLinks = (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item'>
					<Link className='nav-link' to='/register'>
						Sign Up
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link' to='/login'>
						Login
					</Link>
				</li>
			</ul>
		);
		const authtLinks = isAuthenticated ? (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item'>
					<a
						href='//'
						onClick={this.onLogoutClick.bind(this)}
						className='nav-link'>
						Log Out
						<img
							className='rounded-circle'
							src={user.avatar}
							alt={user.name}
							title='You must have a gravatar connected to your email to display your image'
							style={{ width: '30px', marginRight: '5px', marginLeft: '5px' }}
						/>
					</a>
				</li>
			</ul>
		) : null;
		return (
			<nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
				<div className='container'>
					<Link className='nav-link' to='/'>
						DevConnector
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#mobile-nav'>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='mobile-nav'>
						<ul className='navbar-nav mr-auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/profiles'>
									{' '}
									Developers
								</Link>
							</li>
						</ul>
						{console.log(isAuthenticated)}
						{isAuthenticated ? authtLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}
Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
	Navbar,
);

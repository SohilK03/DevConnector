import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../Actions/profileActions';
import Spinner from '../layout/Common/spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
class Dashboard extends Component {
	componentDidMount() {
		console.log('Entered');

		this.props.getCurrentProfile();
	}
	onDeleteClick(e) {
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div className='container container-fluid'>
						<p className='lead text-muted'>
							Welcome <Link to={`profile/${profile.handle}`}> {user.name}</Link>
						</p>
						<ProfileActions></ProfileActions>
						<Experience experience={profile.experience}></Experience>
						<Education education={profile.education}></Education>
						<div style={{ marginBottom: '60px' }}>
							<button
								onClick={this.onDeleteClick.bind(this)}
								className='btn btn-danger'>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				dashboardContent = (
					<div className='container container-fluid'>
						<p className='lead text-muted'>Welcome {user.name}</p>
						<p>You have not created any profile yet</p>
						<Link className='btn btn-lg btn-info' to='/create-profile'>
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>
								Dashboard
								{dashboardContent}
							</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard,
);

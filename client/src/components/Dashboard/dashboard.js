import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../Actions/profileActions';
import Spinner from '../layout/Common/spinner';
class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
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
				dashboardContent = <h4>HHHHHH DIsplay</h4>;
			} else {
				dashboardContent = (
					<div>
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
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

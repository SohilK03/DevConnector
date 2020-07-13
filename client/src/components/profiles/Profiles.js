import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Common/spinner';
import { getProfiles } from '../../Actions/profileActions';
import ProfileItem from './ProfileItem';
class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}
	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;
		if (profiles === null || loading) {
			profileItems = <Spinner></Spinner>;
		} else {
			if (profiles.length > 0) {
                profileItems = (profiles.map(pro=>(
                    <ProfileItem profile={pro}></ProfileItem>
                    )))
                
			} else {
				profileItems = <h4>No Profiles available</h4>;
			}
		}
		return (
			<div className='profiles'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='diplay-4 text-center'>Developer Profiles</h1>
							<p className='lead text-center'>
								Browse and Connect with Developers
							</p>
							{profileItems}
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Profiles.propTypes = {
	profile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);

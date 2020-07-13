import React from 'react';
import { Link } from 'react-router-dom';

function ProfileActions() {
	return (
		<div className='container container-fluid mb-2'>
			<div className='row'>
				<div className='col'>
					<Link to='/edit-profile' className='btn btn-light'>
						<i className='fas fa-user-circle text-info mr-1'></i> Edit Profile
					</Link>
				</div>
				<div className='col'>
					<Link to='/add-experience' className='btn btn-light'>
						<i className='fab fa-black-tie text-info mr-1'></i>
						Add Experience
					</Link>
				</div>
				<div className='col'>
					<Link to='/add-education' className='btn btn-light'>
						<i className='fas fa-graduation-cap text-info mr-1'></i>
						Add Education
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProfileActions;

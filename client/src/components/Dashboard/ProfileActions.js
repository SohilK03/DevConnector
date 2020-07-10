import React from 'react';
import { Link } from 'react-router-dom';

function ProfileActions() {
	return (
		<div>
			<div className='btn-group mb-4' role='group'>
				<Link to='/edit-profile' className='btn btn-light'>
					<i className='fas fa-user-circle text-info mr-1'></i> Edit Profile
				</a>
				<Link to='/add-experience' className='btn btn-light'>
					<i className='fab fa-black-tie text-info mr-1'></i>
					Add Experience
				</a>
				<Link to='/add-education' className='btn btn-light'>
					<i className='fas fa-graduation-cap text-info mr-1'></i>
					Add Education
				</a>
			</div>
		</div>
	);
}

export default ProfileActions;

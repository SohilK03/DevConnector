import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../Validation/isEmpty';
class ProfileCreds extends Component {
	render() {
		const { experience, education } = this.props;
		const expItems = experience.map((exp) => (
			<li className='list-group-item'>
				<h4>{exp.company}</h4>
				<p>
					<Moment format='MMM YYYY'>{exp.from}</Moment>-
					{exp.to === null ? (
						'Current'
					) : (
						<Moment format='MMM YYYY'>{exp.to}</Moment>
					)}
				</p>
				<p>
					<strong>Position:</strong> {exp.title}
				</p>
				<p>
					{exp.location === '' ? null : (
						<span>
							<strong>Location:</strong> <p>{exp.location}</p>
						</span>
					)}
				</p>
				<p>
					{exp.description === '' ? null : (
						<span>
							<strong>Description:</strong> <p>{exp.description}</p>
						</span>
					)}
				</p>
			</li>
		));
		const eduItems = education.map((edu) => (
			<li className='list-group-item'>
				<h4>{edu.school}</h4>
				<p>
					<Moment format='MMM YYYY'>{edu.from}</Moment>-
					{edu.to === null ? (
						'Current'
					) : (
						<Moment format='MMM YYYY'>{edu.to}</Moment>
					)}
				</p>
				<p>
					<strong>Degree:</strong> {edu.degree}
				</p>
				<p>
					<strong>Field Of Study</strong> {edu.fieldOfStudy}
				</p>

				<p>
					{edu.description === '' ? null : (
						<span>
							<strong>Description:</strong> <p>{edu.description}</p>
						</span>
					)}
				</p>
			</li>
		));
		return (
			<div>
				<div className='row'>
					<div className='col-md-6'>
						<h3 className='text-center text-info'>Experience</h3>
						{isEmpty(expItems) ? (
							<h2>No Experience To list</h2>
						) : (
							<ul className='list-group'>{expItems}</ul>
						)}
					</div>
					<div className='col-md-6'>
						<h3 className='text-center text-info'>Education</h3>
						{isEmpty(eduItems) ? (
							<h2>No Edu Items to list</h2>
						) : (
							<ul className='list-group'>{eduItems}</ul>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCreds;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Moment from 'react-moment';
import { deleteExperience } from '../../Actions/profileActions';

class Experience extends Component {
	onDeleteClick(id) {
		this.props.deleteExperience(id);
	}
	render() {
		const experience = this.props.experience.map((exp) => (
			<tr key={exp.id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format='YYYY/MM/DD'>{exp.from}</Moment>-
					{exp.to === null ? (
						'Now'
					) : (
						<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
					)}
				</td>
				<td>
					{' '}
					<button
						onClick={this.onDeleteClick.bind(this, exp._id)}
						className='btn btn-danger'>
						Delete
					</button>{' '}
				</td>
			</tr>
		));
		return (
			<div className='container container-fluid'>
				<h4 className='mb-4'>Experience Credentials</h4>
				<div className='table-responsive'>
					<table className='table table-hover' style={{ fontSize: '1.4rem' }}>
						<thead>
							<tr>
								<th>Company</th>
								<th>Title</th>
								<th>Years</th>
								<th> </th>
							</tr>
						</thead>
						<tbody>{experience}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default connect(null, { deleteExperience })(Experience);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../../components/layout/Common/textFieldGroup';
import TextAreaFieldGroup from '../../components/layout/Common/TextAreaFieldGroup';

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		console.log();
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onCheck(e) {
		this.setState({
			disabled: !this.state.disabled,
            current: !this.state.current,
            
		});
	}
	render() {
		const { errors } = this.state;

		return (
			<div className='add-experience'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12 md-auto'>
							<Link to='/dashboard' className='btn btn-light'>
								Go Back
							</Link>
							<h1 className='display-4 text-center'>Add Experience</h1>
							<p className='lead text-center'>
								Add any job or position that you have had in the past or current
							</p>
							<small className='d-block pb-3'>
								{' '}
								<span style={{ color: 'red' }}> * </span>= Required Fields
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='* Company'
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}></TextFieldGroup>
								<TextFieldGroup
									placeholder='* Job Title'
									name='title'
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}></TextFieldGroup>
								<TextFieldGroup
									placeholder='Location'
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}></TextFieldGroup>
								<h6>From Date</h6>
								<TextFieldGroup
									name='from'
									type='date'
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}></TextFieldGroup>
								<h6>To Date</h6>
								<TextFieldGroup
									name='to'
									type='date'
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={
										this.state.disabled ? 'disabled' : ''
									}></TextFieldGroup>
								<div className='form-check mb-4'>
									<input
										type='checkbox'
										className='form-check-input'
										name='current'
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id='current'
									/>
									<label htmlFor='current' className='form-check-label'>
										This is my Current Job
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder='Job Description'
									name='description'
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info='Tell us about the position'></TextAreaFieldGroup>

								<input
									type='submit'
									value='submit'
									className='btn btn-info btn-block'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});
export default connect(mapStateToProps, {})(withRouter(AddExperience));

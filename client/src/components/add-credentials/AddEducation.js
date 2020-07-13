import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../../components/layout/Common/textFieldGroup';
import TextAreaFieldGroup from '../../components/layout/Common/TextAreaFieldGroup';
import { addEducation } from '../../Actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
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
	componentWillReceiveProps(nexProps) {
		if (nexProps.errors) {
			this.setState({ errors: nexProps.errors });
		}
	}
	onSubmit(e) {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldOfStudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description,
		};

		this.props.addEducation(eduData, this.props.history);
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
							<h1 className='display-4 text-center'>Add Education</h1>
							<p className='lead text-center'>
								Add any school,bootcamp ect. that you have had in the past or
								current
							</p>
							<small className='d-block pb-3'>
								{' '}
								<span style={{ color: 'red' }}> * </span>= Required Fields
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='* School'
									name='school'
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}></TextFieldGroup>
								<TextFieldGroup
									placeholder='* Degree'
									name='degree'
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}></TextFieldGroup>
								<TextFieldGroup
									placeholder='Field Of Study'
									name='fieldofstudy'
									value={this.state.fieldofstudy}
									onChange={this.onChange}
									error={errors.fieldofstudy}></TextFieldGroup>
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
AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});
export default connect(mapStateToProps, { addEducation })(
	withRouter(AddEducation),
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../layout/Common/textFieldGroup';
import TextAreaFieldGroup from '../layout/Common/TextAreaFieldGroup';
import InputGroup from '../layout/Common/InputGroup';
import SelectListGroup from '../layout/Common/SelectListGorup';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		console.log('submit');
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		const { errors, displaySocialInputs } = this.state;
		let socialinputs;
		if (displaySocialInputs) {
			socialinputs = (
				<div>
					<InputGroup
						placeholder='Twitter Profile URL'
						name='twitter'
						icon='fab fa-twitter'
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}></InputGroup>
					<InputGroup
						placeholder='Linkedin Profile URL'
						name='linkedin'
						icon='fab fa-linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}></InputGroup>
					<InputGroup
						placeholder='Facebook Profile URL'
						name='facebook'
						icon='fab fa-facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}></InputGroup>
					<InputGroup
						placeholder='Instagram Profile URL'
						name='instagram'
						icon='fab fa-instagram'
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}></InputGroup>
					<InputGroup
						placeholder='Youtube Profile URL'
						name='youtube'
						icon='fab fa-youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}></InputGroup>
				</div>
			);
		} else {
		}
		// Select options for status
		const option = [
			{ label: ' * Select Professional Status', value: 0 },
			{ label: ' Developer', value: 'Developer' },
			{ label: ' Junior Developer', value: 'Junior Developer' },
			{ label: ' Senior Developer', value: 'Senior Developer' },
			{ label: ' Manager', value: 'Manager' },
			{ label: ' Studetn or Learning', value: 'Studetn or Learning' },
			{ label: ' Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: ' Intern', value: 'Intern' },
			{ label: ' Other', value: 'Other' },
		];
		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Create Your Profile</h1>
							<p className='lead text-center'>
								Let's get some information to make your profile
							</p>
							<small className='d-block pb-3'>
								{' '}
								<span style={{ color: 'red' }}> *</span> = required field
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='* Profile handle'
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info='A unique handle for your profile URL.Your full name,nick name , company name, etc.'></TextFieldGroup>
								<SelectListGroup
									placeholder='* Status'
									name='status'
									value={this.state.status}
									options={option}
									onChange={this.onChange}
									error={errors.status}
									info='Give us a idea about where are you at in your career'></SelectListGroup>
								<TextFieldGroup
									placeholder='Company'
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info='Could be your own company or one which you work for'></TextFieldGroup>
								<TextFieldGroup
									placeholder='website'
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info='Could be your own website or a company one'></TextFieldGroup>
								<TextFieldGroup
									placeholder='Location'
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info='City or city & state suggested (eg. New Delhi,Delhi)'></TextFieldGroup>
								<TextFieldGroup
									placeholder='* Skills'
									name='skills'
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info='Please use Comma Seperated Values (eg. HTML,CSS,Bootstrap,SwiftUI etc.)'></TextFieldGroup>
								<TextFieldGroup
									placeholder='Github Username'
									name='githubusername'
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info='If you want your latest 5 repos and Github Link then include this field'></TextFieldGroup>
								<TextAreaFieldGroup
									placeholder='Shor Bio'
									name='bio'
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info='Tell us a little about Yourself'></TextAreaFieldGroup>

								<div className='mb-3'>
									<button
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialInputs: !prevState.displaySocialInputs,
											}));
										}}
										className='btn btn-light'>
										Add Social Network Links{' '}
									</button>
									<span className='text-butes p2'>Optional</span>
								</div>
								{socialinputs}
								<input
									type='submit'
									value='submit'
									className='btn btn-info btn-block mt-4'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);

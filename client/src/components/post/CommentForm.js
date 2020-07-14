import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../layout/Common/TextAreaFieldGroup';
import { addComment } from '../../Actions/postActions';
class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}
	onSubmit(e) {
		e.preventDefault();
		const { user } = this.props.auth;
		const { postID } = this.props;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addComment(postID, newPost);
		this.setState({ text: '' });
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className='post-form mb-3'>
					<div className='card card-info'>
						<div className='card-header bg-info text-white'>
							Comment Somthing...
						</div>
						<div className='card-body'>
							<form onSubmit={this.onSubmit}>
								<div className='form-group'>
									<TextAreaFieldGroup
										placeholder='Your views'
										name='text'
										value={this.state.text}
										onChange={this.onChange}
										error={errors.text}></TextAreaFieldGroup>
								</div>
								<button type='submit' className='btn btn-dark'>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	postID: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	errors: state.errors,
	auth: state.auth,
});
export default connect(mapStateToProps, { addComment })(CommentForm);

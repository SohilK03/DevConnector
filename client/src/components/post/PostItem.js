import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, likePost, unlikePost } from '../../Actions/postActions';
class PostItem extends Component {
	onDeleteClick(id) {
		this.props.deletePost(id);
	}
	onLikeClick(id) {
		this.props.likePost(id);
	}
	onUnLikeClick(id) {
		this.props.unlikePost(id);
	}

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter((like) => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;
		return (
			<div>
				<div className='card card-body mb-3'>
					<div className='row'>
						<div className='col-md-2'>
							<a href='profile.html'>
								<img
									className='rounded-circle d-none d-md-block'
									src={post.avatar}
								/>
							</a>
							<br />
							<p className='text-center'>{post.name}</p>
						</div>
						<div className='col-md-10'>
							<p className='lead'>{post.text}</p>
							{showActions ? (
								<div>
									<button type='button' className='btn btn-light mr-1'>
										<i
											className={classnames('fas fa-thumbs-up', {
												'text-info': this.findUserLike(post.likes),
											})}
											onClick={this.onLikeClick.bind(this, post._id)}></i>
										<span className='badge badge-light'>
											{post.likes.length}
										</span>
									</button>
									<button
										type='button'
										className='btn btn-light mr-1'
										onClick={this.onUnLikeClick.bind(this, post._id)}>
										<i className='text-secondary fas fa-thumbs-down'></i>
									</button>

									<Link to={`/posts/${post._id}`} className='btn btn-info mr-1'>
										Comments
									</Link>
									{post.user === auth.user.id ? (
										<button
											onClick={this.onDeleteClick.bind(this, post._id)}
											type='button'
											className='btn btn-danger mr-1'>
											<i className='fas fa-times' /> Delete Post
										</button>
									) : null}
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
PostItem.propTypes = {
	likePost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStatetoProps, { deletePost, likePost, unlikePost })(
	PostItem,
);

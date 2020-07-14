import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Common/spinner';
import { getPost } from '../../Actions/postActions';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { Link } from 'react-router-dom';

class IndiPost extends Component {
	componentDidMount() {
		console.log('mount');
		this.props.getPost(this.props.match.params.id);
	}
	render() {
		const { post, loading } = this.props.post;
		let postContent;
		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner></Spinner>;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false}></PostItem>
					<CommentForm postID={post._id}></CommentForm>
					<CommentFeed comments={post.comments} postId={post._id}></CommentFeed>
				</div>
			);
		}
		return (
			<div className='post'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<Link to='/feed' className='btn btn-light mb-3'>
								Back To Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
IndiPost.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPost })(IndiPost);

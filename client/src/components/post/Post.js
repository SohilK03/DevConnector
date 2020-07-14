import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Common/spinner';
import PostForm from './PostForm';
import { getPosts } from '../../Actions/postActions';
import PostFeed from './PostFeed'
class Post extends Component {
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		const { posts, loading } = this.props.post;
		let postContent;
		if (posts === null || loading) {
			postContent = <Spinner></Spinner>;
		} else {
			postContent = <PostFeed posts={posts}></PostFeed>;
		}
		return (
			<div class='feed'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<PostForm></PostForm>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Post.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Post);

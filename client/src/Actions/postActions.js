import axios from 'axios';
import {
	ADD_POST,
	GET_ERRORS,
	GET_POSTS,
	POST_LOADING,
	DELETE_POST,
	GET_POST,
} from './types';

// ADD POST

export const addPost = (postData) => (dispatch) => {
	dispatch(ClearErrors());
	axios
		.post('/api/posts/', postData)
		.then((res) => {
			dispatch({ type: ADD_POST, payload: res.data });
		})
		.catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};

export const ClearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
// GET POSTS

export const getPosts = () => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts/')
		.then((res) => {
			dispatch({ type: GET_POSTS, payload: res.data });
		})
		.catch((err) => dispatch({ type: GET_POSTS, payload: {} }));
};
// DELETE POST

export const deletePost = (id) => (dispatch) => {
	axios
		.delete(`/api/posts/${id}`)
		.then((res) => {
			dispatch({ type: DELETE_POST, payload: id });
		})
		.catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// ADD LIKE

export const likePost = (id) => (dispatch) => {
	axios
		.post(`/api/posts/like/${id}`)
		.then((res) => {
			dispatch(getPosts());
		})
		.catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// REMOVE LIKE

export const unlikePost = (id) => (dispatch) => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then((res) => {
			dispatch(getPosts());
		})
		.catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// GET POST

export const getPost = (id) => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then((res) => {
			console.log('post fetched');
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch((err) => dispatch({ type: GET_POSTS, payload: {} }));
};
// ADD Comment

export const addComment = (id, commentData) => (dispatch) => {
	dispatch(ClearErrors());
	axios
		.post(`/api/posts/comment/${id}`, commentData)
		.then((res) => {
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// ADD Comment

export const deleteComment = (postId, commentId) => (dispatch) => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then((res) => {
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

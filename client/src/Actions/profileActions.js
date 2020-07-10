import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	CURRENT_USER,
	SET_CURRENT_USER,
} from './types';

// Get Current Profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profiles')
		.then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
		.catch((err) => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};

export const createProfile = (profileData, history) => (dispatch) => {
	axios
		.post('/api/profiles', profileData)
		.then((res) => history.push('/dashboard'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

export const deleteAccount = () => (dispatch) => {
	if (window.confirm('Are You Sure ? This Can not be undone')) {
		axios
			.delete('/api/profiles')
			.then((res) =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				}),
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				}),
			);
	}
};
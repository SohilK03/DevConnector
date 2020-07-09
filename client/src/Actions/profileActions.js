import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// Get Current Profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profiles/')
		.then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
		.catch((err) => dispatch({ type: GET_PROFILE, payload: null }));
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

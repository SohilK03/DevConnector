import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register', userData)
		.then((res) => history.push('/login'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

// Login User
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('api/user/login', userData)
		.then((res) => {
			//Save to local storage
			const { token } = res.data;
			//Set token to local Storage
			localStorage.setItem('jwtToken', token);
			// Set token to auth header
			setAuthToken(token);
			// Set the User in Auth state by decoding token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);

	// Set logged in user
	export const setCurrentUser = (decoded) => {
		return {
			type: SET_CURRENT_USER,
			payload: decoded,
		};
	};
};

import { SET_CURRENT_USER } from '../Actions/types';
import isEmpty from '../Validation/isEmpty';
const initialState = {
	isAuthenticated: false,
	user: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};

		default:
			return state;
	}
}

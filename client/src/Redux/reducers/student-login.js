import * as Types from '../../constants/types.action';
import _ from 'lodash';

const initialState = {
	// success: false,
	// token: '',
	// userType: '',
	profile: {}, //decoded
	isAuthenticated: false,
};

export default (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case Types.SET_CURRENT_USER:
			return {
				...state,
				profile: payload.payload,
				isAuthenticated: !_.isEmpty(payload),
			};

		default:
			return {...state};
	}
};

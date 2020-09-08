import * as Types from '../../constants/types.action';
// import {decode} from 'jsonwebtoken';
// import _ from 'lodash';

const initialState = {
	info: {},
	registerDate: '',
	userType: '',
	userName: '',
	passWord: '',
	mssv: '',
	club: [],
};

export default (state = initialState, action) => {
	const {payload} = action;
	// console.log(payload);
	switch (action.type) {
		case Types.GET_USER_BY_ID:
			return {
				...state,
				info: payload.info,
				registerDate: payload.registerDate,
				userType: payload.userType,
				userName: payload.userName,
				passWord: payload.passWord,
				mssv: payload.mssv,
				club: payload.club,
				// isRegisted: !_.isEmpty(payload),
			};

		default:
			return {...state};
	}
};

import * as Types from '../../constants/types.action';
import _ from 'lodash';

const initialState = {
	bug: '',
};

export default (state = initialState, action) => {
	const {payload} = action;
	// console.log(payload);
	switch (action.type) {
		case Types.GET_BUG_REGIST:
			return {
				...state,
				bug: payload,
			};

		default:
			return {...state};
	}
};

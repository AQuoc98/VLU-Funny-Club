import * as Types from '../../constants/types.action';
import _ from 'lodash';

const initialState = {
	isRegisted: false,
};

export default (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case Types.REGIST_SUCCESS:
			return {
				...state,
				isRegisted: !_.isEmpty(payload),
			};

		default:
			return {...state};
	}
};

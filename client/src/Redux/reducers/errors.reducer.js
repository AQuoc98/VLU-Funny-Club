import * as Types from '../../constants/types.action';

const initialState = {};
export default (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case Types.GET_ERRORS:
			return payload;

		default:
			return state;
	}
};

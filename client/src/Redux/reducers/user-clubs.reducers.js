import * as Types from '../../constants/types.action';

var initialState = [];

const userClubs = (state = initialState, action) => {
	const {data, payload} = action;
	switch (action.type) {
		case Types.GET_ALL_CLUBS:
			state = data;
			return [...state];
		default:
			return [...state];
	}
};
export default userClubs;

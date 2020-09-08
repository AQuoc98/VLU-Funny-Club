import * as Types from "../../constants/types.action";

var initialState = [];

const staffClubs = (state = initialState, action) => {
	const { data } = action;
	switch (action.type) {

		case Types.GET_ALL_STUDENT:
			state = data;
			return [...state];
		case Types.GET_CHART_STUDENT:
			return {
				...state,
				chartStudent: action.data,
			};
		default:
			return [...state];
	}
};
export default staffClubs;
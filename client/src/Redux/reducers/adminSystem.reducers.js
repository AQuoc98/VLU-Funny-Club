import * as Types from '../../constants/types.action';
const initialState = {
	errors: '',
	success: '',
	isFetching: false,
};
export default (state = initialState, action) => {
	// console.log("action213", action);
	// console.log("state123", state);
	switch (action.type) {
		case Types.GET_CHART_CLUB:
			return {
				...state,
				chartClub: action.data,
			};

		case Types.CREATE_CLUB:
			return {
				...state,
				success: action.payload.message,
				errors: '',
				isFetching: '',
			};
		case Types.CREATE_CLUB_LOADING:
			return {
				isFetching: true,
			};
		case Types.GET_ERRORS:
			return {
				isFetching: false,
				...state,
				success: '',
				errors: action.payload.message,
			};

		default:
			return state;
	}
};

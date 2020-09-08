import * as Types from "../../constants/types.action";
const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ALL_SCHEDULE_CLUB:
      return [...state];

    default:
      return state;
  }
};

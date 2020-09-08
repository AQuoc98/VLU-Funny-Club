import * as Types from "../../constants/types.action";

var initialState = {
  ClubById: "",
};
const userClubs = (state = initialState, action) => {
  const { ClubById } = action;
  switch (action.type) {
    case Types.GET_CLUB_BY_ID:
      // state = payload;
      return {
        ...state,
        ClubById: ClubById,
      };
    default:
      return { ...state };
  }
};
export default userClubs;

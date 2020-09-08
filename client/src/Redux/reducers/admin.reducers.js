import isEmpty from "is-empty";
import * as Types from "../../constants/types.action";
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_ADMIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
};

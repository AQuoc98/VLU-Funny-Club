import { combineReducers } from "redux";
import adminReducer from "./admin.reducers";
import errorsReducer from "./errors.reducer";
import userClubs from "./user-clubs.reducers";
import userEvents from "./user-events.reducers";
import userLogin from "./student-login.js";
import userRegist from "./student-regist";
import getUserInfoById from "./student-getInfo-by-id";
import adminSystem from "./adminSystem.reducers";
import BugFromLogin from "./login-fail-bug";
import BugFromRegist from "./regist-fail-bug.js";
import getClubsById from "./get-clubs-by-id.reducers.js";
import adminClub from "./adminClub.reducer";

const reducers = {
  adminReducer,
  errorsReducer,
  userClubs,
  userEvents,
  userLogin,
  userRegist,
  getUserInfoById,
  getClubsById,
  adminSystem,
  BugFromLogin,
  BugFromRegist,
  adminClub,
};

export default combineReducers({
  ...reducers,
});

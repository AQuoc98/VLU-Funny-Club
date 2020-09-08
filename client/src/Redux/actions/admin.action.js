import * as Types from "../../constants/types.action";
import axios from "axios";
import { fetchCreateClub } from "../../utils/ClubApiCaller";

export const loginAdmin = (userName, passWord) => (dispatch) => {
  axios
    .post("https://team11-api.azurewebsites.net/api/student/login", {
      userName,
      passWord,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: Types.LOGIN_ADMIN,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};


export const getProfileAdmin = (userName, passWord) => (dispatch) => {
  axios
    .get("https://team11-api.azurewebsites.net/api/student", {
      userName,
      passWord,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: Types.LOGIN_ADMIN,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};
export const getAllTotalClub = () => (dispatch) => {
  axios
    .get("https://team11-api.azurewebsites.net/api/club/getAllClub")
    .then((res) => {
      dispatch({
        type: Types.GET_TOTAL_CLUB,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};

export const getAllTotalEvent = () => (dispatch) => {
  axios
    .get("https://team11-api.azurewebsites.net/api/event/getAll")
    .then((res) => {
      dispatch({
        type: Types.GET_TOTAL_EVENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};

// Create Club
export const createClub = (formData) => (dispatch) => {
  const Authorization = localStorage.getItem("Authorization");
  dispatch({ type: Types.CREATE_CLUB_LOADING });
  axios({
    method: "post",
    url: "https://team11-api.azurewebsites.net/api/club/create/ImageClub",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `${Authorization}`,
    },
    data: formData,
  })
    .then((res) => {
      console.log("123213", res);
      dispatch({
        type: Types.CREATE_CLUB,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};


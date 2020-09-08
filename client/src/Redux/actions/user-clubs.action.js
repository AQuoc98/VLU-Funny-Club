import * as Types from "../../constants/types.action";
import { fetchClubs, fetchFillterClub } from "../../utils/ClubApiCaller";

export const actGetAllClubRequest = () => (dispatch) => {
  fetchClubs()
    .then((res) => {
      dispatch(actGetAllClub(res.data));
    })
    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};
export const actGetAllClub = (data) => {
  return {
    type: Types.GET_ALL_CLUBS,
    data,
  };
};

export const getChartClub = () => (dispatch) => {
  fetchFillterClub()
    .then((res) => {
      console.log("res", res);
      dispatch(getChartAllClub(res.data));
    })
    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};
export const getChartAllClub = (data) => {
  return {
    type: Types.GET_CHART_CLUB,
    data,
  };
};
export const getClubById = (id) => {
  return (dispatch) => {
    const Authorization = localStorage.getItem("Authorization");
    if (Authorization) {
      return fetch(`https://team11-api.azurewebsites.net/api/club/getClubById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${Authorization}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          dispatch({
            type: Types.GET_CLUB_BY_ID,
            ClubById: data,
          });
        });
    }
  };
};

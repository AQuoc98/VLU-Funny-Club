import * as Types from '../../constants/types.action';
import {StudentLogin, StudentRegist} from '../../utils/StudentApiCaller';
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import {
	fetchStudents,
	fetchFillterStudents,
} from '../../utils/StudentApiCaller';

export const loginStudent = (userName, passWord) => (dispatch) => {
	return fetch(`https://team11-api.azurewebsites.net/api/student/login`, {
		method: 'POST',
		body: JSON.stringify({userName, passWord}),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then((resp) => resp.json())
		.catch(function (error) {
			// handle lỗi
			console.log(error);
		})
		.then((data) => {
			console.log(data);
			// console.log(data.userName, data.passWord);
			var Loi = '';
			if (data) {
				if (data.userName || data.passWord) {
					Loi = data.userName || data.passWord;
					dispatch(showLoi(Loi));
					// console.log('LoiLogin : ', Loi);
				} else {
					const token = data.token;
					localStorage.setItem('Authorization', data.token);
					const decoded = jwtDecode(token);
					dispatch(setCurrentUser(decoded));
				}
			}
		});
};
export const logOut = () => {
	return (dispatch) => {
		// xoa localstorage
		localStorage.removeItem('Authorization');
		// xoa current user
		dispatch(setCurrentUser({}));
	};
};
export const showLoi = (bug) => {
	return {
		type: Types.GET_BUG_LOGIN,
		payload: bug,
	};
};
export const showLoiDangKy = (bug) => {
	return {
		type: Types.GET_BUG_REGIST,
		payload: bug,
	};
};

export const setCurrentUser = (data) => {
	return {
		type: Types.SET_CURRENT_USER,
		payload: data,
	};
};

export const RegistStudents = (
	userName,
	passWord,
	passWord2,
	classMajor,
	fullName,
	mssv,
	major,
) => (dispatch) => {
	return fetch(`https://team11-api.azurewebsites.net/api/student/registerUser`, {
		method: 'POST',
		body: JSON.stringify({
			userName,
			passWord,
			passWord2,
			classMajor,
			fullName,
			mssv,
			major,
		}),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then((resp) => resp.json())
		.catch(function (error) {
			// handle lỗi
			console.log(error);
		})
		.then((data) => {
			// console.log(data);
			// console.log(data.userName, data.passWord);
			var LoiDangKy = '';
			if (
				data.userName === 'Tên đăng nhập đã tồn tại' ||
				data.mssv === 'MSSV không được trùng'
			) {
				LoiDangKy = data.userName || data.mssv;
				dispatch(showLoiDangKy(LoiDangKy));
				console.log('LoiDangKy : ', LoiDangKy);
			} else {
				dispatch({
					type: Types.REGIST_SUCCESS,
					payload: data,
				});
			}
		});
};

export const getProfileFetch = (id) => {
	return (dispatch) => {
		const Authorization = localStorage.getItem('Authorization');
		if (Authorization) {
			return fetch(`https://team11-api.azurewebsites.net/api/student/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `${Authorization}`,
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					dispatch({
						type: Types.GET_USER_BY_ID,
						payload: data,
					});
				});
		}
	};
};
// student statistics
export const actGetAllStudentRequest = () => (dispatch) => {
	const Authorization = localStorage.getItem('Authorization');
	if (Authorization) {
		Axios({
			method: 'GET',
			url: `https://team11-api.azurewebsites.net/api/student/getAllUser`,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				dispatch(actGetAllStudent(res.data));
			})
			.catch((err) => {
				dispatch({
					type: Types.GET_ERRORS,
					payload: err,
				});
			});
	}
};

export const getChartStudent = () => (dispatch) => {
	const Authorization = localStorage.getItem('Authorization');
	if (Authorization) {
		Axios({
			method: 'GET',
			url: `https://team11-api.azurewebsites.net/api/student/fillterStudent`,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				dispatch(getChartAllStudent(res.data));
			})
			.catch((err) => {
				dispatch({
					type: Types.GET_ERRORS,
					payload: err,
				});
			});
	}
};

export const getChartAllStudent = (data) => {
	return {
		type: Types.GET_CHART_STUDENT,
		data,
	};
};

export const actGetAllStudent = (data) => {
	return {
		type: Types.GET_ALL_STUDENT,
		data,
	};
};

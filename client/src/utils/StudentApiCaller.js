import axios from 'axios';
const API_BASE_URL = 'https://team11-api.azurewebsites.net/api/student';

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		
	},
});

export const StudentLogin = (params) => {
	// console.log(params);
	try {
		return client.post('/login', params);
	} catch (error) {
		console.log(error);
		console.log(error.data);
	}
};

export const StudentRegist = (params) => {
	// console.log(params);
	return client.post('/registerUser', params);
};
// chart

export const fetchStudents = () => {
	return client.get('/getAllUser');
};

export const fetchFillterStudents = () => {
	return client.get("/fillterStudent");
  };
  

// export const createTask = (params) => {
// 	return client.post('/Tasks', params);
// };

// export const updateTask = (id, params) => {
// 	return axios.put(`${API_BASE_URL}/Tasks/${id}`, params);
// };

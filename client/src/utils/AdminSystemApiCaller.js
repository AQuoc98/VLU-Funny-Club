import axios from 'axios';
const API_BASE_URL = 'https://team11-api.azurewebsites.net/api/adminsystem';

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const StudentLogin = (params) => {
	return client.post('/login', params);
};

// export const createTask = (params) => {
// 	return client.post('/Tasks', params);
// };

// export const updateTask = (id, params) => {
// 	return axios.put(`${API_BASE_URL}/Tasks/${id}`, params);
// };

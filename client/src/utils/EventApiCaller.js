import axios from 'axios';
const API_BASE_URL = 'https://team11-api.azurewebsites.net/api/event';

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const fetchEvents = () => {
	return client.get('/getAll');
};

export const fetchFillterEvent = () => {
	return client.get("/fillterEvent");
  };
  
// export const createTask = (params) => {
// 	return client.post('/Tasks', params);
// };

// export const updateTask = (id, params) => {
// 	return axios.put(`${API_BASE_URL}/Tasks/${id}`, params);
// };

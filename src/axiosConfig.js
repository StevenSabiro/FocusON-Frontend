// src/axiosConfig.js
import axios from 'axios'

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
	baseURL: 'https://hikamoru.pythonanywhere.com',
	headers: {
		Authorization: token ? `Token ${token}` : '',
	},
})

export default axiosInstance

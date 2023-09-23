import axios from 'axios'

const instance = axios.create({
	// baseURL: 'http://localhost:5000/'
	baseURL: 'https://coockassistantapi.onrender.com/'
})

instance.interceptors.request.use( (config) => {
	config.headers.authorization = window.localStorage.getItem('token')

	return config
})

export default instance;
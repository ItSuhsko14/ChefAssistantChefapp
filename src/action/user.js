import axios from 'axios'

export const registration = async (userName, email, password) => {
	try {
		console.log("function registration is started");
		const response = await axios.post('http://localhost:5000/auth/registr',
			{userName, email, password})
		alert(response.data.message)
	} catch(err) {
		console.log('error in registration' + err);

	}
}

export const login = async (userName, email, password) => {
	try {
		console.log("function login is started");
		const response = await axios.post('http://localhost:5000/auth/login',
			{userName, email, password})
		console.log(response.token);
		alert(response.token)

	} catch(err) {
		console.log('error in login ' + err);

	}
}


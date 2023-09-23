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

export const createCard = async (title, text, items) => {
	try {
		console.log("function createCard is started");
		const response = await axios.post('http://localhost:5000/cards',
			{title, text, items})
		console.log(response.token);
		alert(response.token)

	} catch(err) {
		console.log('error in create card: ' + err);

	}
}


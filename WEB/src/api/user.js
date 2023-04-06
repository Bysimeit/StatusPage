import axios from 'axios';
import {API_URL} from './config';

const loginAxios = async (eMail, password) => {
    try {
		localStorage.removeItem('token');
        const response = await axios({
            method: 'post',
            url: `${API_URL}/user`,
            data: {
                email: eMail,
                password: password
            }
        });
  
		const token = response.data;
		localStorage.setItem('token', token);

		return token;
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('L\'email et le mot de passe sont obligatoires.');
		case 404:
			throw new Error('L\'email ou/et le mot de passe est/sont incorrect(s).');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
}

const verifTokenAxios = async (token) => {
	try {
        const response = await axios({
            method: 'get',
			headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/user`,
        });

		return response;
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('L\'email et le mot de passe sont obligatoires.');
		case 404:
			throw new Error('L\'email ou/et le mot de passe est/sont incorrect(s).');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
};

export {loginAxios, verifTokenAxios};

import axios from 'axios';
import {API_URL} from './config';

const getAllUser = async (token) => {
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/client`,
        });

		const data = response.data
		return data;
	} catch (e) {
		switch (e.response.status) {
		case 404:
			throw new Error('Aucun utilisateur avec cette email.');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
};

const getUser = async (eMail, token) => {
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/client/${eMail}`,
        });

		const data = response.data;
		return data;
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Email non identifié');
		case 404:
			throw new Error('Aucun utilisatgeur avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postNewUser = async (name, password, eMail) => {
	try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/client`,
			data: {
				name: name, 
				password: password, 
				email: eMail
			}
        });

		const data = response.data
		return data;
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes pour l\'ajout.');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
};

const updateUser = async (id, name, eMail, token) => {
	try {
		const response = await axios({
			method: 'patch',
			headers: {'Authorization': 'Bearer ' + token},
			url: `${API_URL}/client/edit`,
			data: {
				id: id, 
				name: name, 
				email: eMail
			}
		});

		const data = response.data
		return data;
	} catch(e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Aucun mot de passe correspond à cette email.');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
};

const updateEmailPasswordUser = async (oldPassword , newPassword, oldEmail, newEmail, token) => {
	try {
        let response;
		if (newPassword !== undefined) {
			response = await axios({
				method: 'patch',
				headers: {'Authorization': 'Bearer ' + token},
				url: `${API_URL}/client`,
				data: {
					oldPassword: oldPassword, 
					newPassword: newPassword, 
					oldEmail: oldEmail, 
				}
			});
		} else {
			response = await axios({
				method: 'patch',
				headers: {'Authorization': 'Bearer ' + token},
				url: `${API_URL}/client`,
				data: {
					oldPassword: oldPassword, 
					newEmail: newEmail, 
					oldEmail: oldEmail, 
				}
			});
		}

		const data = response.data
		return data;
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Aucun mot de passe correspond à cette email.');
		case 404:
			throw new Error('Aucun utilisateur avec cette email.');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
};

const deleteUser = async (id, token) => {
	try {
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/client`,
			data: {
				id: id,
			}
        });

		const data = response.data
		return data;
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes pour l\'ajout.');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
		}
	}
};

export {getAllUser, getUser, postNewUser, updateUser, updateEmailPasswordUser, deleteUser};

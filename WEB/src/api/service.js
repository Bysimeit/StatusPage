import axios from 'axios';
import {API_URL} from './config';

const getAllService = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/service`
        });

        return response.data;
    } catch (e) {
        switch (e.response.status) {
            case 404: 
                throw new Error('Aucun service trouvé');
            default: 
                throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
        }
    }
};

const postNewService = async (name, addressIp, port, token) => {
    try {
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/service`,
            data: {
                name: name,
                addressIp: addressIp,
                port: port
            }
        });

        return response.data;
    } catch (e) {
        switch (e.response.status) {
            case 400:
                throw new Error('Données manquantes pour l\'ajout.');
            default: 
                throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
        }
    }
};

const updateService = async (id, name, addressIp, port, status, token) => {
    try {
        const response = await axios({
            method: 'patch',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/service`,
            data: {
                id: id,
                name: name,
                addressIp: addressIp,
                port: port,
                status: status
            }
        });

        return response.data;
    } catch (e) {
        switch (e.response.status) {
            default: 
                throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
        }
    }
};

const deleteService = async (id, token) => {
    try {
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/service`,
			data: {
				id: id,
			}
        });

        return response.data;
    } catch (e) {
        switch (e.response.status) {
            default: 
                throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard.');
        }
    }
};

export { getAllService, postNewService, updateService, deleteService };
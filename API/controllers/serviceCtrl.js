const pool = require('../models/database');
const ServiceModel = require('../models/serviceDB');

module.exports.getListService = async (req, res) => {
    const client = await pool.connect();

    try {
        let result;

        result = await ServiceModel.getAllService(client);

        if (result.rows[0] !== undefined) {
            res.json(result.rows);
        } else {
            res.sendStatus(404);
        } 
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postNewService = async (req, res) => {
    const {name, addressIp, port} = req.body;

    if (name === undefined || addressIp == undefined || port === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();

        try {
            await ServiceModel.postNewService(client, name, addressIp, port);
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updateService = async (req, res) => {
    const {id, name, addressIp, port, status} = req.body;

    if (id === undefined || name === undefined || addressIp === undefined || port == undefined || status === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();

        try {
            await ServiceModel.updateService(client, id, name, addressIp, port, status);
            res.sendStatus(204);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.deleteService = async (req, res) => {
    const {id} = req.body;

    const client = await pool.connect();

    try {
        await ServiceModel.deleteService(client, id);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

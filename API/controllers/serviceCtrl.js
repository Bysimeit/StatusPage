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

module.exports.getListServiceForPing = async () => {
    const client = await pool.connect();

    try {
        let result;

        result = await ServiceModel.getAllService(client);

        if (result.rows[0] !== undefined) {
            return result.rows;
        } else {
            return null;
        } 
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        client.release();
    }
}

module.exports.updateUptimeToday = async (idService, number) => {
    const client = await pool.connect();

    try {
        let firstCell = await ServiceModel.getFirstCellUptimeHistory(client, idService);
        firstCell = firstCell.rows[0].uptimehistory;
        let uptime = await ServiceModel.getUptime(client, idService);
        uptime = uptime.rows[0].uptime;
        let result = firstCell / 100;
        result *= uptime;
        result += number;
        await ServiceModel.updateUptime(client, idService);
        result = result / (uptime + 1);
        result *= 100;
        await ServiceModel.updateUptimeHistory(client, idService, result);
        if (result >= 80) {
            await ServiceModel.updateStatus(client, 0, idService)
        } else {
            if (result >= 30) {
                await ServiceModel.updateStatus(client, 2, idService)
            } else {
                if (result >= 0) {
                    await ServiceModel.updateStatus(client, 3, idService)
                }
            }
        }
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        client.release();
    }
}

module.exports.updateUptimeHistory = async (idService) => {
    const client = await pool.connect();

    try {
        const result = await ServiceModel.getAllService(client);
        const services = result.rows;
        for (const service of services) {
            const uptimeHistory = service.uptimehistory;
            uptimeHistory.unshift(100);
            uptimeHistory.pop();
            await ServiceModel.updateUptimeHistoryHours(client, uptimeHistory, service.id);
            await ServiceModel.updateUptimeZero(client, service.id);
        }
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        client.release();
    }

    setInterval(module.exports.updateUptimeHistory, 24 * 60 * 60 * 1000);
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

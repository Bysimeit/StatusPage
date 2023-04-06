const pool = require('../models/database');
const ClientModel = require('../models/clientDB');
const { getHash } = require('../utils/utils');
const { compareHash } = require('../utils/utils');

module.exports.getAllUser = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: users} = await ClientModel.getAllUser(client);
        if (users !== undefined) {
            res.json(users);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getUser = async (req, res) => {
    const {email} = req.params;

    if (email === undefined) {
        res.status(400).json("Email manquant");
    } else {
        const client = await pool.connect();
        try {
            const result = await ClientModel.getDataUser(client, email);
            if (result.rows[0] !== undefined) {
                res.json(result.rows);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.postNewUser = async (req, res) => {
    const {name, password, email} = req.body;

    if (name === undefined || password === undefined || email === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await ClientModel.postNewUser(client, email, name, await getHash(password));
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updatePasswordEmailUser = async (req, res) => {
    const {oldPassword , newPassword, oldEmail, newEmail} = req.body;


    if (oldPassword === undefined || oldEmail === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            if (newPassword !== undefined) {
                const result = await ClientModel.getDataUser(client, oldEmail);
                if (result.rows[0].password !== undefined) {
                    if (await compareHash(oldPassword, result.rows[0].password)) {
                        await ClientModel.updatePasswordUser(client, oldEmail, await getHash(newPassword));
                        res.sendStatus(204); 
                    } else {
                        res.status(400).json("Mot de passe incorrecte");
                    } 
                } else {
                    res.sendStatus(404);
                }                     
            } else if (newEmail !== undefined) {
                await ClientModel.updateEmailUser(client, oldEmail, newEmail);
                res.sendStatus(204); 
            } else {
                res.sendStatus(400);
            }         
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }    
}

module.exports.updateUser = async (req, res) => {
    const {id, name, email} = req.body;

    if (id === undefined || name === undefined || email === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await ClientModel.updateUser(client, id , name, email);
            res.sendStatus(204); 
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }    
}

module.exports.deleteUser = async (req, res) => {
    const {id} = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); 
        await ClientModel.deleteUser(client, id);
        await client.query("COMMIT");
        res.sendStatus(204);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

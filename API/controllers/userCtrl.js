require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../models/database');
const UserModel = require('../models/userDB');
const ClientModel = require('../models/clientDB');

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    
    if (email === undefined || password === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            const result = await UserModel.getAccount(client, email, password);
            if (result.userType !== undefined || result.value !== undefined) {
                const {userType, value} = result;
                if (userType === "inconnu") {
                    res.sendStatus(404);
                } else {
                    const {id, email} = value;
                    const payload = {status: userType, value: {id, email}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '30d'} 
                    );              
                    res.json(token);
                }
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

module.exports.verifyToken = async (req, res) => {
    const {email} = req.session;

    if (email === undefined){
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
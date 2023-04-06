// GET
module.exports.getAllService = async (client) => {
    return await client.query(`SELECT * FROM service ORDER BY id`);
}

// POST
module.exports.postNewService = async (client, name, addressIp, port) => {
    return await client.query(`INSERT INTO service (name, addressIp, port, status, uptimeHistory) VALUES ($1, $2, $3, 1, '{}')`, [name, addressIp, port]);
}

// PATCH
module.exports.updateService = async (client, id, name, addressIp, port, status) => {
    return await client.query(`UPDATE Service SET name = $2, addressIp = $3, port = $4, status = $5 WHERE id = $1`, [id, name, addressIp, port, status]);
}

// DELETE
module.exports.deleteService = async (client, id) => {
    return await client.query(`DELETE FROM Service WHERE id = $1`, [id]);
}
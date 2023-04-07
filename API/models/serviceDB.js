// GET
module.exports.getAllService = async (client) => {
    return await client.query(`SELECT * FROM service ORDER BY id`);
}

module.exports.getFirstCellUptimeHistory = async (client, id) => {
    return await client.query(`SELECT uptimeHistory[1] FROM Service WHERE id = $1`, [id]);
}

module.exports.getUptime = async (client, id) => {
    return await client.query(`SELECT uptime FROM Service WHERE id = $1`, [id]);
}

// POST
module.exports.postNewService = async (client, name, addressIp, port) => {
    return await client.query(`INSERT INTO Service (name, addressIp, port, status, uptime, uptimeHistory) VALUES ($1, $2, $3, 1, 0, '{100, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1}')`, [name, addressIp, port]);
}

// PATCH
module.exports.updateService = async (client, id, name, addressIp, port, status) => {
    return await client.query(`UPDATE Service SET name = $2, addressIp = $3, port = $4, status = $5 WHERE id = $1`, [id, name, addressIp, port, status]);
}

module.exports.updateUptime = async (client, id) => {
    return await client.query(`UPDATE Service SET uptime = uptime + 1 WHERE id = $1`, [id]);
}

module.exports.updateUptimeZero = async (client, id) => {
    return await client.query(`UPDATE Service SET uptime = 0 WHERE id = $1`, [id]);
}

module.exports.updateUptimeHistory = async (client, id, result) => {
    return await client.query(`UPDATE Service SET uptimehistory = array_replace(uptimehistory, uptimehistory[1], $1) WHERE id = $2; `, [result, id]);
}

module.exports.updateUptimeHistoryHours = async (client, uptimeHistory, id) => {
    return await client.query(`UPDATE Service SET uptimeHistory = $1 WHERE id = $2`, [uptimeHistory, id]);
}

module.exports.updateStatus = async (client, number, id) => {
    return await client.query(`UPDATE Service SET status = $1 WHERE id = $2`, [number, id]);
}

// DELETE
module.exports.deleteService = async (client, id) => {
    return await client.query(`DELETE FROM Service WHERE id = $1`, [id]);
}
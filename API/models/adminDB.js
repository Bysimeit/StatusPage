module.exports.getAdmin = async (client, email) => {
    return await client.query(`SELECT * FROM Customer WHERE email = $1 AND isAdmin = true`, [email]);
}
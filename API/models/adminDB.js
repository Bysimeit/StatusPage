module.exports.getAdmin = async (client, email) => {
    return await client.query(`SELECT * FROM client WHERE email = $1 AND isAdmin = true`, [email]);
}
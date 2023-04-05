// GET
module.exports.getAllUser = async (client) => {
    return await client.query("SELECT * FROM client ORDER BY id");
}

module.exports.getUser = async (client, mail) => {
    return await client.query("SELECT * FROM client WHERE email = $1 AND isAdmin = false",[mail]);
}

module.exports.getDataUser = async (client, mail) => {
    return await client.query("SELECT * FROM client WHERE email = $1",[mail]);
}

module.exports.getIfUserExit = async (client, mail) => {
    return await client.query("SELECT COUNT(*) as count FROM client WHERE email = $1", [mail]);
}

// POST
module.exports.postNewUser = async (client, email, name, password) => {
    return await client.query("INSERT INTO client(name, email, password, isAdmin) VALUES ($1,$2,$3,$4) RETURNING id", [name, email, password, false]);
}

// UPDATE
module.exports.updateUser = async (client, id , name, email) => {
    return await client.query("UPDATE client SET email = $1, firstName = $2 WHERE id = $3", [email, name, id]);
}

module.exports.updatePasswordUser = async (client, email, newPassword) => {
    return await client.query("UPDATE client SET password = $1 WHERE email =$2", [newPassword, email]);
}

module.exports.updateEmailUser = async (client, email, newEmail) => {
    return await client.query("UPDATE client SET email = $1 WHERE email =$2", [newEmail, email]);
}

// DELETE
module.exports.deleteUser = async (client, id) => {
    return await client.query("DELETE FROM client WHERE id = $1",[id]);
}
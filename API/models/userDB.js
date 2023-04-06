const { getAdmin } = require('./adminDB');
const { getUser } = require('./clientDB');
const { compareHash } = require('../utils/utils');

module.exports.getAccount = async (client, mail, password) => {
    const promises = [];
    const promiseClient = getUser(client, mail); 
    const promiseAdmin = getAdmin(client, mail);
    promises.push(promiseClient, promiseAdmin);
    const values = await Promise.all(promises);
    const clientRow = values[0].rows[0];
    const adminRow = values[1].rows[0];
    if(clientRow !== undefined && await compareHash(password, clientRow.password)) {
        return {userType: "client", value: clientRow};
    } else if (adminRow !== undefined && await compareHash(password, adminRow.password)) {
        return {userType: "admin", value: adminRow};
    } else {
        return {userType: "inconnu", value: null}
    }
}
const { sequelize } = require('../db');
const { ClientModel } = require('../models')(sequelize);

function findAll() {
    return ClientModel.findAll();
}

function findByClientId(clientId) {
    return ClientModel.findOne({
        where: {
            client_id: clientId,
        },
    });
}

module.exports = {
    findAll,
    findByClientId,
};

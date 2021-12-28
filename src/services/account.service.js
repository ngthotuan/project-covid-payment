const { sequelize } = require('../db');
const { AccountModel } = require('../models')(sequelize);

function findAll() {
    return AccountModel.findAll();
}

const findAccountByUsername = (username) => {
    return AccountModel.findOne({ where: { username: username } });
};

module.exports = {
    findAll,
    findAccountByUsername,
};

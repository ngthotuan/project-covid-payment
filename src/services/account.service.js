const { sequelize } = require('../db');
const { account: Account } = require('../models')(sequelize);

function findAll() {
    return Account.findAll();
}

module.exports = {
    findAll,
};

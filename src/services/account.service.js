const { sequelize } = require('../db');
const { AccountModel } = require('../models')(sequelize);

function findAll() {
    return AccountModel.findAll();
}

module.exports = {
    findAll,
};

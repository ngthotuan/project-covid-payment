const { sequelize } = require('../db');
const { AccountHistoryModel } = require('../models')(sequelize);

function findAll() {
    return AccountHistoryModel.findAll();
}

module.exports = {
    findAll,
};

const { sequelize } = require('../db');
const { AccountHistoryModel } = require('../models')(sequelize);

const findAll = async (condition) => {
    return await AccountHistoryModel.findAll(condition);
};

module.exports = {
    findAll,
};

const { sequelize } = require('../db');
const { AccountHistoryModel } = require('../models')(sequelize);

function findAll() {
    return AccountHistoryModel.findAll();
}
const save = async (transactionHistory) => {
    try {
        await AccountHistoryModel.create({ transactionHistory });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    findAll,
    save,
};

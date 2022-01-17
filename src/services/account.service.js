const { sequelize } = require('../db');
const { AccountModel } = require('../models')(sequelize);

function findAll() {
    return AccountModel.findAll();
}
const deposit = async (username, amount) => {
    if (amount < 0) return false;
    const account = await AccountModel.findOne({ username: username });
    await account.update({
        balance: amount.balance + amount,
    });
    account.save();
    return true;
};

module.exports = {
    findAll,
    deposit,
};

const { sequelize } = require('../db');
const { AccountModel } = require('../models')(sequelize);
const bcrypt = require('bcrypt');

function findAll(condition) {
    return AccountModel.findAll(condition);
}
const deposit = async (username, amount) => {
    try {
        if (amount < 0) return false;
        const account = await AccountModel.findOne({
            where: { username: username },
        });

        await account.update({
            balance: parseInt(account.balance) + parseInt(amount),
        });
        account.save();
        return true;
    } catch (e) {
        console.log(e.message);
    }
};

const findAccountByUsername = (username) => {
    return AccountModel.findOne({ where: { username: username } });
};

const createPasswordInLogin = async (username, password) => {
    const account = await AccountModel.findOne({
        where: { username: username },
    });
    if (account.password) {
        throw Error('Username đã có mật khẩu');
        return;
    }
    const passwordHashed = bcrypt.hashSync(password, 8);
    await account.update({ password: passwordHashed });
    return account;
};

const findById = async (id) => {
    return AccountModel.findByPk(id);
};

const changePassword = async (id, password) => {
    const passwordHashed = bcrypt.hashSync(password, 8);
    const account = await AccountModel.findByPk(id);
    account.update({ password: passwordHashed });
};

function updateBalance(id, balance) {
    return AccountModel.update({ balance }, { where: { id } });
}

module.exports = {
    findAll,
    deposit,
    updateBalance,
    findAccountByUsername,
    findById,
    createPasswordInLogin,
    changePassword,
};

const { sequelize } = require('../db');
const { AccountModel } = require('../models')(sequelize);
const bcrypt = require('bcrypt');

function findAll(condition) {
    return AccountModel.findAll(condition);
}

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

const createAccount = async (username, password, role) => {
    const passwordHashed = bcrypt.hashSync(password, 8);
    const newAccount = await AccountModel.create({
        username: username,
        password: passwordHashed,
        role: role,
        blocked: false,
        balance: 0,
    });
    return newAccount;
};

const findById = async (id) => {
    return AccountModel.findByPk(id);
};

const update = async (id, data) => {
    const product = await AccountModel.findByPk(id);
    product.update(data);
};

module.exports = {
    findAll,
    findAccountByUsername,
    findById,
    createPasswordInLogin,
    createAccount,
    update,
};

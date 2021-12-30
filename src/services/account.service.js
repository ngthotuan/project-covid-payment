const { sequelize } = require('../db');
const { AccountModel } = require('../models')(sequelize);
const bcrypt = require('bcrypt');

function findAll() {
    return AccountModel.findAll();
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

module.exports = {
    findAll,
    findAccountByUsername,
    createPasswordInLogin,
};

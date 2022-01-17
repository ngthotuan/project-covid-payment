const DataTypes = require('sequelize').DataTypes;
const _account = require('./account.model');
const _account_histories = require('./account_histories.model');
const _client = require('./client.model');

function initModels(sequelize) {
    const account = _account(sequelize, DataTypes);
    const account_histories = _account_histories(sequelize, DataTypes);
    const client = _client(sequelize, DataTypes);

    account_histories.belongsTo(account, {
        as: 'account',
        foreignKey: 'account_id',
    });
    account.hasMany(account_histories, {
        as: 'account_histories',
        foreignKey: 'account_id',
    });

    return {
        AccountModel: account,
        AccountHistoryModel: account_histories,
        ClientModel: client,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

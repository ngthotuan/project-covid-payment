const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'account',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            balance: {
                type: DataTypes.BIGINT,
                default: 0,
                allowNull: true,
            },
            blocked: {
                type: DataTypes.BOOLEAN,
                default: false,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'account',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'account_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

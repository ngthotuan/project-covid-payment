const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'client',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            client_id: {
                type: DataTypes.STRING(64),
                default: 0,
                allowNull: true,
            },
            client_secret: {
                type: DataTypes.STRING(64),
                default: false,
                allowNull: true,
            },
            redirect_url: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'client',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'client_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};
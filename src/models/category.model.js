const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'category',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            limit_person: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            limit_product: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            limit_time: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'category',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'category_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

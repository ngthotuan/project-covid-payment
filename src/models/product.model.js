const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'product',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            unit: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            category_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'product',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'product_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'product_categories',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            category_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'product',
                    key: 'id',
                },
            },
            limit_product: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'product_categories',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'product_categories_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'image',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            path: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'product',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'image',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'image_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

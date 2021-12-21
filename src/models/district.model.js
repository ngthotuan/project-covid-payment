const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'district',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            province_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'province',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'district',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'district_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

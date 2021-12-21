const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'hospital',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            address: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            current_size: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            district_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'district',
                    key: 'id',
                },
            },
            province_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'province',
                    key: 'id',
                },
            },
            ward_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'ward',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'hospital',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'hospital_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

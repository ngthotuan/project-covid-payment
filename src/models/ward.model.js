const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'ward',
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
            district_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'district',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'ward',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'ward_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

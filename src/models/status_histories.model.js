const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'status_histories',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            destination: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            source: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            patient_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'patient',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'status_histories',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'status_histories_pkey',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
            ],
        },
    );
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hospital_histories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    export_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hospital_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    import_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    patient_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'hospital_histories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hospital_histories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_histories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'account',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'account_histories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "account_histories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

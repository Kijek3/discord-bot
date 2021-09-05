module.exports = (sequelize, DataTypes) => {
  return sequelize.define('settings', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    setting: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
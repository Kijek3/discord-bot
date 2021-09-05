module.exports = (sequelize, DataTypes) => {
  return sequelize.define('config', {
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
      unique: true,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('weather', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
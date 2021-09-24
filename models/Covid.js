module.exports = (sequelize, DataTypes) => {
  return sequelize.define('covid', {
    userId: {
      type: DataTypes.STRING,
      unique: true,
    },
    guess: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });
};
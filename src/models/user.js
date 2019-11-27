
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    last_logged_in: DataTypes.DATE,
  }, {});
  // User.associate = function (models) {
  //   // associations can be defined here
  // };
  return User;
};

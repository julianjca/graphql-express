
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
  }, {});
  Role.associate = (models) => {
    models.Role.hasMany(models.User);
  };
  return Role;
};

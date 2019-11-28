module.exports = (sequelize, DataTypes) => {
  const UserTransaction = sequelize.define('UserTransaction', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER(15, 2),
    transactionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {});
  UserTransaction.associate = (models) => {
    models.UserTransaction.belongsTo(models.User);
  };

  return UserTransaction;
};

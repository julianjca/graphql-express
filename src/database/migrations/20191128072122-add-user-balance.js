module.exports = {
  /**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').QueryInterface} QueryInterface
 */

  /**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} Sequelize
 * @returns
 */
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'balance', Sequelize.DECIMAL(15, 2)),

  down: (queryInterface) => queryInterface.removeColumn('Users', 'last_logged_in'),
};

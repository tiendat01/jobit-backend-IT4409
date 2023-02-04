'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.renameTable('UserAdmins', 'Admin');
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.renameTable('Admin', 'UserAdmins');
    }
};
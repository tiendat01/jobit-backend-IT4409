'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tagNews')
            .then(() => queryInterface.dropTable('news'))
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('tagNews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            newId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "News",
                    key: "id"
                },
                onDelete: 'CASCADE'
            },
            tagId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Tags",
                    key: "id"
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        })
            .then(() => queryInterface.createTable('news', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                },
                samary: {
                    type: Sequelize.STRING(1000)
                },
                content: {
                    type: Sequelize.TEXT
                },
                avatar: {
                    type: Sequelize.STRING(500)
                },
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: "Users",
                        key: "id"
                    },
                    onDelete: "CASCADE"
                },
                status: {
                    type: Sequelize.INTEGER
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }))
    }
};

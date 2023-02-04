'use strict'

module.exports = (sequelize, DataTypes) => {
  const LivesearchResult = sequelize.define("LivesearchResult", {
    keyword: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    tableName: 'live_search'
  })

  return LivesearchResult
}
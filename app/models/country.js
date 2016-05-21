"use strict";

module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define("Country", {
    name: DataTypes.STRING,
    lat: DataTypes.BIGINT,
    lon: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        
        Country.hasMany(models.State, { as: 'states' });

      }
    }
  });

  return Country;
};
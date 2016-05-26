"use strict";

module.exports = function(sequelize, DataTypes) {
  var Indicator = sequelize.define("Indicator", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        
        Indicator.belongsToMany(models.State, {through: 'Measurement'});

      }
    }
  });

  return Indicator;
};
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Indicator = sequelize.define("Indicator", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    max: DataTypes.REAL,
    unit: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        
        Indicator.belongsToMany(models.State, {through: 'Measurement'});
        
      }
    }
  });

  return Indicator;
};
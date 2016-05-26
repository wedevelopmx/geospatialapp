"use strict";

module.exports = function(sequelize, DataTypes) {
  var Measurement = sequelize.define("Measurement", {
    value: DataTypes.REAL
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Measurement;
};
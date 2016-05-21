"use strict";

module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define("State", {
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    lat: DataTypes.BIGINT,
    lon: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {

        State.belongsTo(models.Country, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return State;
};
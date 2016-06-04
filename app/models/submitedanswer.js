"use strict";

module.exports = function(sequelize, DataTypes) {
  var SubmitedAnswer = sequelize.define("SubmitedAnswer", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        SubmitedAnswer.belongsTo(models.SubmitedQuestion, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });

        SubmitedAnswer.belongsTo(models.Answer, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return SubmitedAnswer;
};
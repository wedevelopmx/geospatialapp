"use strict";

module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    title: DataTypes.STRING,
    type: DataTypes.TEXT,
    order: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {

        Answer.belongsTo(models.Question, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Answer;
};
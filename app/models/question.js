"use strict";

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    required: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        
        Question.hasMany(models.Answer, { as: 'answers' });

        Question.belongsTo(models.Section, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Question;
};
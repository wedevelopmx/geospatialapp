"use strict";

module.exports = function(sequelize, DataTypes) {
  var SubmitedQuestion = sequelize.define("SubmitedQuestion", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    otherAnswer: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //SubmitedQuestion.hasMany(models.SubmitedAnswer, { as: 'submitedAnswers' });
        //SubmitedQuestion.belongsToMany(models.Answer, {through: 'SubmitedAnswer'});
        
        SubmitedQuestion.belongsTo(models.SubmitedSurvey, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });

        SubmitedQuestion.belongsTo(models.Question, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });

        SubmitedQuestion.belongsTo(models.Answer, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });

      }
    }
  });

  return SubmitedQuestion;
};
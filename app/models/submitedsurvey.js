"use strict";

module.exports = function(sequelize, DataTypes) {
  var SubmitedSurvey = sequelize.define("SubmitedSurvey", {
    state: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      	
        //SubmitedSurvey.belongsToMany(models.Question, {through: 'SubmitedQuestion'});
        SubmitedSurvey.hasMany(models.SubmitedQuestion, { as: 'submitedQuestions' });

        SubmitedSurvey.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });

        SubmitedSurvey.belongsTo(models.ProjectSurvey, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });

      }
    }
  });

  return SubmitedSurvey;
};
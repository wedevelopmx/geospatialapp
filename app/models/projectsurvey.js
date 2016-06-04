"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProjectSurvey = sequelize.define("ProjectSurvey", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      	ProjectSurvey.hasMany(models.SubmitedSurvey, { as: 'submitedSurveys' });

      }
    }
  });

  return ProjectSurvey;
};
"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    displayname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    profileimageurl: DataTypes.STRING,
    provider: DataTypes.STRING,
    providerid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task);
        User.hasMany(models.Project);
        User.hasMany(models.SubmitedSurvey);
      }
    }
  });

  return User;
};
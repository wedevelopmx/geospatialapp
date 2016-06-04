"use strict";

module.exports = function(sequelize, DataTypes) {
  var Survey = sequelize.define("Survey", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {

        Survey.belongsToMany(models.Project, {through: 'ProjectSurvey'});
        
        Survey.hasMany(models.Section, { as: 'sections' });

        Survey.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Survey;
};
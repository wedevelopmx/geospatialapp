"use strict";

module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    lat: DataTypes.BIGINT,
    lon: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Project;
};
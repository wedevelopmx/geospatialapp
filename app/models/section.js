"use strict";

module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define("Section", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    order: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        
        Section.hasMany(models.Question, { as: 'questions' });

        Section.belongsTo(models.Survey, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Section;
};
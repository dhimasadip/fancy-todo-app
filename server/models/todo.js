'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, { sequelize });

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'})
  };
  
  return Todo;
};
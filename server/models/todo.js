'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}

  const d = new Date().getDate()
  const m = new Date().getMonth()+1
  const y = new Date().getFullYear()
  const yesterday = `${m}/${d}/${y}`

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Title can't be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: ` Description can't be empty`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: ` Choose status`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: false,
          msg: ` Please select due date`
        },
        isAfter: {
          args: new Date(yesterday).toISOString().split('T')[0],
          msg: ` Due date must be today or after`
        }
      }
    }
  }, { sequelize });

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'})
  };
  
  return Todo;
};
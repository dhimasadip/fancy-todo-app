'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: false,
          msg: 'Wrong email format'
        },
        notEmpty: {
          args: false,
          msg: ` Email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: ` Password can't be empty`
        },
        len: {
          args: [8,16],
          msg: ` Password at least 8 characters and maximum 16 characters`
        }
      }
    }
  }, { 
    hooks:{
      beforeCreate: (instance) => {
        const hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    },
    sequelize 
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, { foreignKey: 'UserId', targetKey: 'id' })
  };
  
  return User;
};
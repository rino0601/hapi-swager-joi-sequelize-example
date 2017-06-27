'use strict'; // jshint ignore:line 
 
// var config = require('../../config/config'),
//     bcrypt = require('bcrypt'),
//     salt   = config.saltGen;
 
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false, /* will generate a .required() on joi schema */
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      description: 'User`s identifier' /* will generate a .description() on joi schema tha can be used by swagger */
    },
    firstname: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false, 
      description: 'User`s first name'
    },
    lastname: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false,
      description: 'User`s last name'
    },
    email: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false,
      description: 'User`s email'
    },
    password: {
      type: DataTypes.STRING, /* will generate .string() */
      allowNull: false,
      description: 'User`s password'
    },
    role: {
      type: DataTypes.ENUM('admin', 'common user'), /* will generate .valid('admin', 'common user') */
      allowNull: false,
      description: 'User`s role'
    },
    active: {
      type: DataTypes.BOOLEAN, /* will generate .boolean() */
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here 
      }
    }
  });
  return User;
};
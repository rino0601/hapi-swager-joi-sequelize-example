'use strict'; // jshint ignore:line 
 
// var config = require('../../config/config'),
//     bcrypt = require('bcrypt'),
//     salt   = config.saltGen;
 
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Residence', {
    id: {
      allowNull: false, /* will generate a .required() on joi schema */
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      description: 'Residence`s identifier' /* will generate a .description() on joi schema tha can be used by swagger */
    },
    name: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false, 
      description: 'Residence`s name'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here 
        // console.log("associate","group",models);
      }
    }
  });
  return Group;
};
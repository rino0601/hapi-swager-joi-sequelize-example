'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,  // allowNull: false 인 것 이 하나 이상 필요 하다. (id, ~_at 제외)
      description: 'Profile`s self introduce' /* will generate a .description() on joi schema tha can be used by swagger */
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};
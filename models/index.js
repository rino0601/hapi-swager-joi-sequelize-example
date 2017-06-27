/**
 * Created by rino0 on 2017-06-27.
 */
"use strict";

var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    JoiSequelize = require('joi-sequelize'),
    basename  = path.basename(module.filename),
    env       = process.env.NODE_ENV || 'development',
    log       = (!process.env.LOG || process.env.LOG === 'false') ? false : true,
    config    = require(__dirname + '/../config/database.json')[env],
    db,
    sequelize;



function init() {
  db = {};
  config.logging = (env === 'development' && log) ? console.log : false;

  sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, config)
    : new Sequelize(config.database, config.username, config.password, config);
 
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  db.JS = {};
  fs
    .readdirSync(__dirname)
    .filter(file => (
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js')
      )
    )
    .forEach(function (file) {
      var model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
      db.JS[model.name] = new JoiSequelize(require(path.join(__dirname, file)));
    });
    
  Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
 
  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].addScopes) {
      db[modelName].addScopes(db);
    }
 
    if (db[modelName].addHooks) {
      db[modelName].addHooks(db);
    }
  });
  
  return db;
}
 
module.exports = db || init();
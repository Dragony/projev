var Sequelize = require("sequelize");
var fs = require("fs");

var sequelize = new Sequelize('projev', 'root', 'lol', {
  // custom host; default: localhost
  host: 'localhost',

  // custom port; default: 3306
  port: 3306,

  // custom protocol
  // - default: 'tcp'
  // - added in: v1.5.0
  // - postgres only, useful for heroku
  protocol: null,

  // disable logging; default: console.log
  logging: false,

  // max concurrent database requests; default: 50
  maxConcurrentQueries: 100,

  // the sql dialect of the database
  // - default is 'mysql'
  // - currently supported: 'mysql', 'sqlite', 'postgres'
  dialect: 'mysql',

  // the storage engine for sqlite
  // - default ':memory:'
  //storage: 'path/to/database.sqlite',

  // disable inserting undefined values as NULL
  // - default: false
  omitNull: false,

  // a flag for using a native library or not.
  // in the case of 'pg' -- set this to true will allow SSL support
  // - default: false
  native: false,

  // Specify options, which are used when sequelize.define is called.
  // The following example:
  //   define: {timestamps: false}
  // is basically the same as:
  //   sequelize.define(name, attributes, { timestamps: false })
  // so defining the timestamps for each model will be not necessary
  // Below you can see the possible keys for settings. All of them are explained on this page
  define: {
    underscored: true,
    freezeTableName: false,
    syncOnAssociation: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    //classMethods: {method1: function() {}},
    //instanceMethods: {method2: function() {}},
    timestamps: true
  },

  // similiar for sync: you can define this to always force sync for models
  sync: { force: true },

  // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
  syncOnAssociation: true,

  // use pooling in order to reduce db connection overload and to increase speed
  // currently only for mysql and postgresql (since v1.5.0)
  //pool: { maxConnections: 5, maxIdleTime: 30},

  // language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
  // options are: en [default], es
  language: 'en'
});

// This may not be required...
var fileListCache;

if(fileListCache === undefined){
  var fileList = fs.readdirSync(__dirname);
  fileListCache = fileList;
}else{
  var fileList = fileListCache;
}

fileList.splice(fileList.indexOf('index.js'), 1);
fileList.forEach(function(model){
  var modelName = model.substr(0, model.length - 3);
  module.exports[modelName] = sequelize.import(__dirname + '/' + model);

  // Debug to keep database always up to date
  module.exports[modelName].sync();
  
  console.log('Entity Loaded: ', model);
});

module.exports.sequelize = sequelize;
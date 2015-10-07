'use strict';

// Dependencies
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var AngularLightGenerator = yeoman.generators.Base.extend({
	preinit: function() {
		this.pkg = require('../package.json');
  		this.sourceRoot(path.join(__dirname, '../templates'));	
	},
	
	scaffoldFolders: function() {
		mkdirp("app", function (err) {
    		if (err) console.error(err)
		});
	},
	copyMainFiles: function() {
		this.copy("root/_bowerrc", ".bowerrc");
		this.copy("root/_package.json", "package.json");
		this.copy("root/_bower.json", "bower.json");
		this.copy("root/_yo-rc.json", "yo-rc.json");
		this.copy("root/_gitignore", ".gitignore");
	},
});

module.exports = AngularLightGenerator;

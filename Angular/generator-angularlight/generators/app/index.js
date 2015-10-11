'use strict';

// Dependencies
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var scriptBased = require('../../script-base.js');

var AngularLightGenerator = module.exports = function Generator(args, options) {
	// Call base version
	yeoman.generators.NamedBase.apply(this, arguments);
	// Get the app name
	this.argument('appname', { type: String, required: false });
	this.appname = this.appname || path.basename(process.cwd());
	this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
	this.scriptAppName = this.appname + 'App';
	//  Require the package.json file.
	this.pkg = require('../../package.json');
	// Set the source for templates.
	this.sourceRoot(path.join(__dirname, '../../templates'));
	// Hook additional sub generators.
	args = ['main'];
	this.hookFor('angularlight:controller', { args: args });
	// Register end event handler.
	this.on('end', function () {
		// Install dependencies.
		this.installDependencies({
			skipInstall: false,
			skipMessage: false,
			callback: this._finished.bind(this)
		});		
	});
};
	
util.inherits(AngularLightGenerator, yeoman.generators.NamedBase);

AngularLightGenerator.prototype.scaffoldFolders = function() {
	// Make folders in the app.
	mkdirp("app", function (err) { if (err) console.error(err) });
	mkdirp("app/styles", function (err) { if (err) console.error(err) });
	mkdirp("app/images", function (err) { if (err) console.error(err) });
	mkdirp("app/views", function (err) { if (err) console.error(err) });
};

AngularLightGenerator.prototype.copyMainFiles = function() {
		// Copy files to the main project folder.
		this.copy("root/_bowerrc", ".bowerrc");
		this.copy("root/_yo-rc.json", "yo-rc.json");
		this.copy("root/_gitignore", ".gitignore");
		this.template("root/_package.json", "package.json");
		this.template("root/_bower.json", "bower.json");
};

AngularLightGenerator.prototype.copyAppFiles = function() {
	// Copy files to the app folder.
	this.copy("app/404.html", "app/404.html");
	this.copy("app/robots.txt", "app/robots.txt");
	this.template("app/index.html", "app/index.html");
	this.template("app/styles/main.css", "app/styles/main.css");
	this.template("app/views/main.html", "app/views/main.html");
	//this.template("app/views/view.html", "app/views/view.html");	
};

AngularLightGenerator.prototype._finished = function() {
	// ...and we're finished.
	console.log("Finished");
};

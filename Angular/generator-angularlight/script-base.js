'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var angularUtils = require("./util.js");

var ScriptBaseGenerator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);
	this.env.options.appPath = "app";
	this.env.options.testPath = "test/spec";
	this.appname = this._.slugify(this._.humanize(this.appname));
	this.scriptAppName = this._.camelize(this.appname);
	this.cameledName = this._.camelize(this.name);
  	this.classedName = this._.classify(this.name);
	// Set the source for templates.
	this.sourceRoot(path.join(__dirname, 'templates/javascript'));
};

util.inherits(ScriptBaseGenerator, yeoman.generators.NamedBase);

ScriptBaseGenerator.prototype.appTemplate = function(src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [src + '.js', path.join(this.env.options.appPath, dest.toLowerCase()) + '.js']);	
};

ScriptBaseGenerator.prototype.testTemplate = function(src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [src + '.js', path.join(this.env.options.testPath, dest.toLowerCase()) + '.js']);	
};

ScriptBaseGenerator.prototype.addScriptToIndex = function(script) {
	try {
    	var appPath = this.env.options.appPath;
    	var fullPath = path.join(appPath, 'index.html');
		angularUtils.rewriteFile({
			file: fullPath,
      		needle: '<!-- endbuild -->',
      		splicable: ['<script src="scripts/' + script.toLowerCase().replace(/\\/g, '/') + '.js"></script>']
    	});
  	} catch (e) {
    	this.log.error(chalk.yellow('\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'));
  	}
};

ScriptBaseGenerator.prototype.generateSourceAndTest = function(appTemplate, testTemplate, targetDirectory) {
	// Create source files.	
	this.appTemplate(appTemplate, path.join('scripts', targetDirectory, this.name));
	this.testTemplate(appTemplate, path.join(targetDirectory, this.name));
	this.addScriptToIndex(path.join(targetDirectory, this.name));
};

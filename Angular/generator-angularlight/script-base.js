'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var ScriptBaseGenerator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ScriptBaseGenerator, yeoman.generators.NamedBase);

ScriptBaseGenerator.prototype.generateSourceAndTest = function(appTemplate, testTemplate, targetDirectory) {
	// Create source files.	
};
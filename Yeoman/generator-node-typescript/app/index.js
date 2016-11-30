"use strict";
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		var done = this.async();
		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the minimal ' + chalk.red('Node TypeScript') + ' generator by Rob Garrett!'));
		this.log(chalk.cyan('I simply get down to business of generating, no questions asked!') + '\n');
		done();
	},
	writing: {


	},
	install: {
		npmInstall: function () {
			var generator = this;
			generator.npmInstall(null, { skipInstall: this.options['skip-install'] }, function () {
				
			});
		}
	}
});

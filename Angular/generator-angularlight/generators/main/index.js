'use strict';

// Dependencies
var util = require('util');
var ScriptBase = require('../../script-base.js');

var MainGenerator = module.exports = function Generator() {
	ScriptBase.apply(this, arguments);		
	// Set the source for templates.
	this.sourceRoot(path.join(__dirname, '../../templates/javascript'));
	
};

util.inherits(MainGenerator, ScriptBase);

MainGenerator.prototype.createAppFile = function createAppFile() {
  this.appTemplate('app', 'scripts/app');
};

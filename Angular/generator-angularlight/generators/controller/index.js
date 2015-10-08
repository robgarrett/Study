'use strict';

// Dependencies
var util = require('util');
var ScriptBase = require('../../script-base.js');

var ControllerGenerator = module.exports = function Generator() {
	ScriptBase.apply(this, arguments);
};

util.inherits(ControllerGenerator, ScriptBase);

ControllerGenerator.prototype.createControllerFiles = function createControllerFiles() {
  this.generateSourceAndTest('controller', 'spec/controller', 'controllers');
};

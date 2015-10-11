'use strict';

// Dependencies
var util = require('util');
var path = require('path');
var ScriptBase = require('../../script-base.js');

var ControllerGenerator = module.exports = function Generator() {
	ScriptBase.apply(this, arguments);
	// if the controller name is suffixed with ctrl, remove the suffix
  	// if the controller name is just "ctrl," don't append/remove "ctrl"
  	if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    	this.name = this.name.slice(0, -4);
  	}
};

util.inherits(ControllerGenerator, ScriptBase);

ControllerGenerator.prototype.createControllerFiles = function createControllerFiles() {
  this.generateSourceAndTest('controller', 'spec/controller', 'controllers');
};

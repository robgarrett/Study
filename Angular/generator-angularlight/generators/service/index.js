'use strict';

var util = require('util');
var ScriptBase = require('../../script-base.js');

var ServiceGenerator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(ServiceGenerator, ScriptBase);

ServiceGenerator.prototype.createServiceFiles = function createServiceFiles() {
  this.generateSourceAndTest('service/service', 'spec/service', 'services');
};

'use strict';

var Q = require('q');
var fs = require('fs');

var readSingleFile = function(name) {
	var deferred = Q.defer();
	console.log('Reading file', name);
	fs.readFile(name, "utf-8", function (error, text) {
		if (error) {
			deferred.reject(new Error(error));
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
};

var readFiles = function() {
	console.log('Reading files');
	var deferred = Q.defer();
	var filenames = ['index.js', 'package.json'];
	// Get the filenames, which is a deferred function.
	return getFileNames().then(function(filenames) {
		if (filenames.length === 0) { 
			console.log('No filenames');
			return deferred.resolve(); 
		}
		// Create a promise for each file to load.
		var promises = [];
		filenames.forEach(function(filename) {
			promises.push(readSingleFile(filename));
		});
		// Resolve when all files loaded.
		return Q.all(promises).then(deferred.resolve);
	});
};

var getFileNames = function() {
	var deferred = Q.defer();
	// Simulate a asynch call with defer.
	console.log('Getting filenames...');
	Q.delay(1000).then(function() {
		console.log('done');
		deferred.resolve(['index.js', 'package.json']);
	});
	return deferred.promise;
};

readFiles();

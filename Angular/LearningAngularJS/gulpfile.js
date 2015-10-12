var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
	  port: 1337,
	  root: ['.']
  });
});
  
gulp.task('default', ['webserver']);

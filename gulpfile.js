var gulp = require("gulp");
var config = require("./config")(); //import config file.
var liveServer = require("gulp-live-server");
var browserSync = require("browser-sync"); //testing porpuses.
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var less = require("gulp-less");
var path = require("path");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");


gulp.task("bundle", function(){
	return gulp.src([
		"./src/*.js", 
		"./src/controllers/*.js", 
		"./src/services/*.js", 
		"./src/components/**/*.js"])
	.pipe(uglify())
	.pipe(concat("app.js"))
	.pipe(gulp.dest("./public/js"));
});

//less compiler
gulp.task("less", function(){
	return gulp.src(config.devPaths.less)
	.pipe(concat("all.css"))
	.pipe(less({
		paths:[
			"./node_modules/bootstrap-less",
			"./node_modules/toastr"
		]
	}))
	.pipe(minifyCSS({
		keepSpecialComments: 0
	}))
    .pipe(rename('all.min.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	.pipe(gulp.dest(config.publicPaths.css));
});

//running server task.
gulp.task("live-server", function(){
	var server = liveServer("./server.js");
	server.start();
});

gulp.task("sync", ["live-server", "copy-html", "bundle", "less"], function(){
	browserSync.init(null, {
		proxy:"http://localhost:"+config.port,
		port:9001
	});
});

//Watch for changes
gulp.task("watch", function(){
	gulp.watch("./src/**/*.js", ['bundle']);
	gulp.watch("./src/**/*.html", ['copy-html']);
	gulp.watch(config.devPaths.less, ['less']); 
	//"Watch" every html file, and if any change, run 'html', 'js' task.
});

gulp.task('default', ['sync', "watch"]);
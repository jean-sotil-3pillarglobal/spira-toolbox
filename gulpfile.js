var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var config = require("./config")(); //import config file.
var browserSync = require("browser-sync"); //testing porpuses.


/*bundle js files*/
gulp.task("bundle", function(){
	return gulp.src(config.devPaths.source)
	.pipe(plugins.uglify())
	.pipe(plugins.concat("app.js"))
	.pipe(gulp.dest("./public/js"));
});

//less compiler
gulp.task("less", function(){
	return gulp.src(config.devPaths.less)
	.pipe(plugins.concat("all.min.css"))
	.pipe(plugins.less({
		paths:[
			"./node_modules/bootstrap-less",
			"./node_modules/toastr",
			"./node_modules/nya-bootstrap-select"
		]
	}))
	.pipe(plugins.minifyCss({
		keepSpecialComments: 0
	}))
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	.pipe(gulp.dest(config.publicPaths.css));
});

//running server task.
gulp.task("live", function(){
	var server = plugins.liveServer("./server.js");
	server.start();
});

gulp.task("hint", function(){
	return gulp
		.src(config.devPaths.source)
		.pipe(plugins.jshint(".jshintrc"))
		.pipe(plugins.jshint.reporter("jshint-stylish"));
});

gulp.task("sync", ["live", "bundle", "less", "hint"], function(){
	browserSync.init(null, {
		proxy:"http://localhost:"+config.port,
		port:9001
	});
});

//Watch for changes
gulp.task("watch", function(){
	gulp.watch(config.devPaths.source, ['bundle', 'hint'])
		.on('change', function(evt){
			console.log("*** File " + evt.path + " was " + evt.type + ", running tasks...");
		});
	gulp.watch(config.devPaths.less, ['less']);
});

gulp.task('default', ['sync', "watch"]);
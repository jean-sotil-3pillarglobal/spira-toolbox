module.exports = function(){
	var config = {
		"port" : 5555,
		"devPaths": {
			"less" : "./src/styles/**/*.less",
			"js" : "./src/**/*.js",
			"templates" : "./src/views/"
		},
		"publicPaths" : {
			"css" : "./public/styles",
			"js" : "./public/js",
			"templates" : "./public/views"
		}
	}

	return config;
};
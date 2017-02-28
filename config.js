module.exports = function(){
	var config = {
		"port" : 5555,
		"devPaths": {
			"less" : "./src/styles/**/*.less",
			"js" : "./src/**/*.js",
			"templates" : "./src/views/",
			"source" : [
				"./src/*.js", 
				"./src/controllers/*.js",
				"./src/controllers/**/*.js", 
				"./src/filters/*.js", 
				"./src/services/*.js", 
				"./src/components/**/*.js"],
		},
		"publicPaths" : {
			"css" : "./public/styles",
			"js" : "./public/js",
			"templates" : "./public/views"
		}
	}

	return config;
};
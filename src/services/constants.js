(function(){

	var contants =  {
		/*Global Values*/
		APP_TITLE : "Spira Toolbox",
		APP_DESCRIPTION : "Great for learning Angular features.",
		APP_VERSION : "1.0",
		APP_NAVIGATION : [
			{state:'app', header:'Me', active: false},
			{state:'app.projects', header:'Projects', active: false},
			{state:'app.charts', header:'Charts', active: false}
		],
		/*Auth Ctrl*/
		APP_AUTH_SUCCESS_TITLE : "Awesome.",
		APP_AUTH_SUCCESS_MESSAGE : "You were successfully authenticated.",
		APP_AUTH_ERROR_TITLE : "Oh no!.",
		APP_AUTH_ERROR_MESSAGE : "Please provide valid user information."

	};

	/*Contants Service*/
	app.constant("constantsService", contants);
}());
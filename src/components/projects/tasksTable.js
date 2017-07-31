(function(){
	'use strict';
	
	/*<tasksTable /> component*/
	app.component("tasksTable", {
		templateUrl : "./views/projects/tasksTable.html",
		bindings: {
			data : '='
		},
		controllerAs : "mv",
		controller : app.controllers.taskstable 
	});
}());
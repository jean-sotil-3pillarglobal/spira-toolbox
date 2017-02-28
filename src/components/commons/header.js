(function(){
	'use strict';
	
	/*<appheader /> component*/
	app.component("appheader", {
		templateUrl: "./views/commons/header.html",
		controllerAs : "mv",
		controller: ['$scope', 
					 'constantsService', 
					 'localStorageService', 
					 app.controllers.header]
	});
}());
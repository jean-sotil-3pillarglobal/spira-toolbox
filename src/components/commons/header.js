(function(){
	/*<appheader /> component*/
	app.component("appheader", {
		templateUrl: "./views/commons/header.html",
		controllerAs : "mv",
		controller: ['$scope', 'constantsService', app.controllers.header]
	});
}());
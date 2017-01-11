(function(){
	/*<chartBars /> component*/
	app.component("bars", {
		templateUrl : "./views/projects/charts/chartBars.html",
		bindings: {
			data : '=',
			selector : '@',
			title: '@',
			display : '=',
			year : '=',
		},
		controllerAs : "mv",
		controller: ["$scope", app.controllers.chartBars]
	});
}());
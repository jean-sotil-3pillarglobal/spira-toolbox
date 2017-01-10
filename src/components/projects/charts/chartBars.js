(function(){
	/*<chartBars /> component*/
	app.component("bars", {
		templateUrl : "./views/projects/charts/chartBars.html",
		bindings: {
			data : '=',
			selector : '@',
			title: '@',
			labels : '=',
			series : '=',
			display : '=',
			options : '=',
			year : '=',
			colors: '='
		},
		controllerAs : "mv",
		controller: ["$scope", app.controllers.chartBars]
	});
}());
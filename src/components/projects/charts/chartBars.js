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
			click : '='
		}
	});
}());
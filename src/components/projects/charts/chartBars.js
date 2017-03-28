(function(){
	'use strict';
	
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
		controller : function(){
			var mv = this;

			mv.download = function($event){
				var $link = $($event.currentTarget), 
					$canvas = $link.parent().find("canvas")[0];

				$link.prop("href", $canvas.toDataURL());
				$link.prop("download", "chart-" + window.randomID(10,"aA") + ".png");
			};
		}
	});
}());
(function(){
	'use strict';
	
	/*<accordion-item /> component*/
	app.component("accordionItem", {
		templateUrl : "./views/commons/accordionItem.html",
		transclude: true,
		bindings: {
			release : '@',
			section: '@',
			label : '@',
			icon : '@'
		},
		controllerAs : "mv"
	});
}());
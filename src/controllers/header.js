(function() {
	'use strict';
	
    if (!app.controllers) {
    	app.controllers = {};
    }

    /*Admin Ctrl*/
    app.controllers.header = function($scope, 
    								  constantsService, 
    								  localStorageService) {
    	$scope.mv.items = constantsService.APP_NAVIGATION;
        $scope.mv.username = localStorageService.get("username");
    };
}());
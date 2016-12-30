(function() {
    if (!app.controllers) app.controllers = {};

    app.controllers.admin = function($scope, $state, authService) {
    	
    	$scope.init = function(){

			/*Check if user is logged already.*/
	    	if(authService.isLoggedAlready()) {
	    		$state.go("home");
	    	} else {
	    		$state.go("auth");
	    	}
		};
    };

    app.controller("AdminCtrl", ["$scope", "$state", "authService", app.controllers.admin]);
}())
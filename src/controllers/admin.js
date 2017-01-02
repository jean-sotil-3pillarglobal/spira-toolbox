(function() {
    if (!app.controllers) app.controllers = {};

    /*Admin Ctrl*/
    app.controllers.admin = function($scope, 
    								 $state, 
    								 authService) {
    	
    	$scope.init = function(){

			/*Check if user is logged already.*/
	    	if(authService.isLoggedAlready()) {
	    		$state.transitionTo('me');
	    	} else {
	    		$state.transitionTo('auth');
	    	}
		};
    };

    /*Admin Def*/
    app.controller("AdminCtrl", ["$scope", 
    							 "$state", 
    							 "authService", 
    							 app.controllers.admin]);
}())
(function() {
    if (!app.controllers) app.controllers = {};

    /*Admin Ctrl*/
    app.controllers.admin = function($scope, 
    								 $state,
                                     $timeout, 
    								 authService) {
    	
    	$scope.init = function(){
            $timeout(function(){
    			/*Check if user is logged already.*/
    	    	if(authService.isLoggedAlready()) {
    	    		$state.transitionTo('me');
    	    	} else {
    	    		$state.transitionTo('auth');
    	    	}
            });
		};
    };

    /*Admin Def*/
    app.controller("AdminCtrl", ["$scope", 
    							 "$state", 
                                 "$timeout",
    							 "authService", 
    							 app.controllers.admin]);
}())
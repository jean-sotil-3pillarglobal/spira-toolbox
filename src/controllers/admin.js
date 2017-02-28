(function() {
    'use strict';

    if (!app.controllers) {
        app.controllers = {};
    }

    /*Admin Ctrl*/
    app.controllers.admin = function($scope, 
    								 $state,
                                     $timeout,
                                     $sce,
                                     dataService, 
    								 authService,
                                     localStorageService) {
    	
    	$scope.init = function(){
            $timeout(function(){
    			/*Check if user is logged already.*/
    	    	if(authService.isLoggedAlready()) {
    	    		$state.transitionTo('app.projects');
    	    	} else {
    	    		$state.transitionTo('auth');
    	    	}
            });
		};

        $scope.logOut = function(){
            authService.deleteCredentials();
            $timeout(function(){
                $state.transitionTo('auth');
            });
        };

        $scope.parseHTML = function(project){
            project.HTMLDescription = $sce.trustAsHtml(project.Description);
        };

        $scope.projects = localStorageService.get("projects");
    };

    /*Admin Def*/
    app.controller("AdminCtrl", ["$scope", 
    							 "$state", 
                                 "$timeout",
                                 "$sce",
                                 "dataService",
    							 "authService", 
                                 "localStorageService",
    							 app.controllers.admin]);
}());
(function() {
    'use strict';

    if (!app.controllers) {
        app.controllers = {};
    }

    /*AuthCtrl Function*/
    app.controllers.auth = function($scope, 
    								$state, 
                                    $timeout,
    								dataService, 
    								authService, 
    								toastrService,
                                    constantsService,
                                    localStorageService) {
        /*submit form.*/
    	$scope.submit = function(){
    		dataService.authUser($scope.username, $scope.token).then(function(response){
                $timeout(function(){
                    if(response.status == "200"){
                        toastrService.success(constantsService.APP_AUTH_SUCCESS_TITLE, constantsService.APP_AUTH_SUCCESS_MESSAGE);
                        authService.createCredentials($scope.username, $scope.token);
                        localStorageService.set("projects", response.data);
        				$state.transitionTo('app.projects');
        			} 
                });
    		}).catch(function() {
		        // Catch and handle exceptions from success/error/finally functions
		        toastrService.error(constantsService.APP_AUTH_ERROR_TITLE, constantsService.APP_AUTH_ERROR_MESSAGE);
		    });
    	};
    };

    /*AuthCtrl Def*/
    app.controller('AuthCtrl', ['$scope', 
                                '$state', 
                                '$timeout',
                                'dataService', 
                                'authService', 
                                'toastrService', 
                                'constantsService',
                                'localStorageService', 
                                app.controllers.auth]);
}());

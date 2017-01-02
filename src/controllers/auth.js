(function() {
    if (!app.controllers) app.controllers = {};

    /*AuthCtrl Function*/
    app.controllers.auth = function($scope, 
    								$state, 
    								dataService, 
    								authService, 
    								toastrService,
                                    constantsService) {
        /*submit form.*/
    	$scope.submit = function(){
    		dataService.authUser($scope.username, $scope.token).then(function(data){
    			if(data.status == "200"){
    				toastrService.success(constantsService.APP_AUTH_SUCCESS_TITLE, constantsService.APP_AUTH_SUCCESS_MESSAGE);
    				authService.createCredentials();
    				$state.transitionTo('me');
    			} 
    		}).catch(function(error) {
		        // Catch and handle exceptions from success/error/finally functions
		        toastrService.error(constantsService.APP_AUTH_ERROR_TITLE, constantsService.APP_AUTH_ERROR_MESSAGE);
		    });
    	};
    };

    /*AuthCtrl Def*/
    app.controller('AuthCtrl', ['$scope', 
                                '$state', 
                                'dataService', 
                                'authService', 
                                'toastrService', 
                                'constantsService', 
                                app.controllers.auth]);
}())

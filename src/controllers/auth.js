(function() {
    if (!app.controllers) app.controllers = {};

    app.controllers.auth = function($scope, 
    								$state, 
    								dataService, 
    								authService, 
    								toastrService) {
        /*submit form.*/
    	$scope.submit = function(){
    		dataService.authUser($scope.username, $scope.token).then(function(data){
    			if(data.status == "200"){
    				toastrService.success("Logged in", "Successfully authenticated.");
    				authService.createCredentials();
    				$state.transitionTo('me.projects');
    			} 
    		}).catch(function(error) {
		        // Catch and handle exceptions from success/error/finally functions
		        toastrService.error("Authentication failed", "Please provide valid user information.");
		    });
    	};
    };

    app.controller('AuthCtrl', ['$scope', '$state', 'dataService', 'authService', 'toastrService', app.controllers.auth]);
}())

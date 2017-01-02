(function() {
    if (!app.controllers) app.controllers = {};

    /*Admin Ctrl*/
    app.controllers.header = function($scope, 
    								  constantsService) {
    	$scope.mv.items = constantsService.APP_NAVIGATION;

        $scope.mv.isActive = function(state){
           return (state == true)?'active':'';
        };
    };
}())
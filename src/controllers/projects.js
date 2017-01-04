(function() {
    if (!app.controllers) app.controllers = {};

    /*ProjectCtrl Function*/
    app.controllers.projects = function($scope, 
    									$stateParams,
    									dataService,
    									$filter) {

        $scope.projectId = $stateParams.id;
        $scope.selected = {};
        $scope.releases = [];
        $scope.users = [];
        $scope.project = [];
        $scope.incidents = [];
        $scope.incidentsTypes = [];
        $scope.filteredByRelease = [];


        /*get global data*/
    	dataService.getProjectById($stateParams.id).then(function(response){
    		$scope.project = response.data;
    	});
        dataService.getProjectReleasesById($stateParams.id).then(function(response){
            $scope.releases = response.data;
        });
        dataService.getProjectUsersById($stateParams.id).then(function(response){
            $scope.users = response.data;
        });
        dataService.getProjectIncidentsById($stateParams.id).then(function(response){
            $scope.incidents = response.data;
        });
        dataService.getProjectIncidentsTypeById($stateParams.id).then(function(response){
            $scope.incidentsTypes = response.data;
        });

        /*Functions*/
        /*Filtered by Release Id*/
        $scope.filterReleaseById = function(id){
            var filter = [id, 'DetectedReleaseId'];
            $scope.filteredByRelease = $filter('filterFindBy')($scope.incidents, filter);
        };


    };

    /*ProjectCtrl Def*/
    app.controller('ProjectCtrl', ['$scope', 
    								'$stateParams',
    								'dataService',
    								'$filter',
                                	app.controllers.projects]);
}())
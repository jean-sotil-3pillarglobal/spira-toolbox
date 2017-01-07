(function() {
    if (!app.controllers) app.controllers = {};

    /*ProjectCtrl Function*/
    app.controllers.projects = function($scope, 
    									$stateParams,
    									dataService,
    									$filter,
                                        $timeout,
                                        constantsService) {

        $scope.projectId = $stateParams.id;
        $scope.selected = {};
        $scope.releases = [];
        $scope.users = [];
        $scope.project = [];
        $scope.incidents = [];
        $scope.incidentsTypes = [];
        $scope.filteredByRelease = [];
        $scope.years = constantsService.APP_PROJECT_YEARS;
        $scope.selected.year =  $scope.years[0];

        /*Charts*/
        $scope.chart1 = {};
        $scope.chart2 = {};

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
        dataService.getProjectIncidentsTypeById($stateParams.id).then(function(response){
            $scope.incidentsTypes = response.data;
        });
        dataService.getProjectIncidentsCountById($stateParams.id).then(function(response){
            /*get total count of incidents by project*/
            dataService.getProjectIncidentsById($stateParams.id, response.data).then(function(response){
                $scope.incidents = response.data;
                $timeout($scope.updateValues());
            });
        });

        /*Update charts*/
        $scope.updateValues = function(){
            $scope.filterReleaseByMonths();
            $scope.filterReleases();
        };

        /*Functions*/
        /*Filtered by Release Id*/
        $scope.filterReleaseById = function(id){
            var filter = [id, 'DetectedReleaseId'];
            $scope.filteredByRelease = $filter('filterFindBy')($scope.incidents, filter);
        };
        /*Filtered by Release by Month*/
        $scope.filterReleaseByMonths = function(){
            var filter = [$scope.selected.year, 'DetectedReleaseByYear'];
            var filterByYear = $filter('filterFindBy')($scope.incidents, filter);
            /*Chart 1 - Reported by Month*/
            $scope.chart1.labels = constantsService.APP_PROJECT_MONTHS; 
            $scope.chart1.series = ['Incidents Reported'];
            $scope.chart1.data = $scope.bindArrayWithQuantity($scope.chart1.labels, filterByYear, 'DetectedReleaseByMonth');
        };
        /*Filtered by Releases*/
        $scope.filterReleases = function(){
            var filter  = [$scope.selected.year, 'DetectedReleaseByYear'];
            var filterByYear = $filter('filterFindBy')($scope.incidents, filter);
            var detectedReleasesIndex = $scope.getLabelsArray(filterByYear, 'DetectedReleaseId');

            /*Chart 2 - Reported by Releases*/
            $scope.chart2.labels = $scope.bindArrayWithValue(detectedReleasesIndex, $scope.releases, 'DetectedReleaseValues');
            $scope.chart2.series = ['Incidents Reported By Releases'];
            console.log(detectedReleasesIndex);
            console.log($scope.chart2.labels);
            
            $scope.chart2.data = $scope.bindArrayWithQuantity(detectedReleasesIndex, filterByYear, 'DetectedReleaseId');
        };

        /*Utils*/
        $scope.bindArrayWithQuantity = function(array1, array2, type){
            var container = [];
            $(array1).each(function(i, value){
                var filter = [value, type];
                var filtered = $filter('filterFindBy')(array2, filter);
                container.push(filtered.length);
            });
            return container;
        };
        $scope.bindArrayWithValue = function(array1, array2, type){
            var container = [];
            $(array1).each(function(i, value){
                var filter = [value, type];
                var filtered = $filter('filterFindBy')(array2, filter);
                container.push(filtered);
            });
            return container;
        };
        /*get labels*/
        $scope.getLabelsArray = function(array, index){
            var container = [];
            $(array).each(function(i, value){
                if(container.indexOf(value[index]) == -1 && value[index]) container.push(value[index]);
            });
            return container;
        };

    };

    /*ProjectCtrl Def*/
    app.controller('ProjectCtrl', ['$scope', 
    								'$stateParams',
    								'dataService',
    								'$filter',
                                    '$timeout',
                                    'constantsService',
                                	app.controllers.projects]);
}())
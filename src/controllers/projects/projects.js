(function() {
    'use strict';

    if (!app.controllers) {
        app.controllers = {};
    }

    /*ProjectCtrl Function*/
    app.controllers.projects = function($scope, 
                                        $stateParams,
                                        dataService,
                                        $filter,
                                        $timeout,
                                        constantsService,
                                        helperService,
                                        toastrService) {

        $scope.selected = {};
        $scope.selected.projects = [];
        $scope.selectAll = false;
        $scope.releases = [];
        $scope.users = [];
        $scope.project = [];
        $scope.incidents = [];
        $scope.customProperties = [];
        $scope.filteredByRelease = [];
        $scope.years = [];

        /*Charts*/
        $scope.chart1 = {};
        $scope.chart2 = {};
        $scope.chart3 = {};
        $scope.chart4 = {};
        $scope.chart5 = {};
        $scope.chart6 = {};
        $scope.chart7 = {};

        /*Getting global data*/
        dataService.getProjectById($stateParams.id).then(function(response){
            $scope.project = response.data;
        });
        dataService.getProjectUsersById($stateParams.id).then(function(response){
            $scope.users = response.data;
        });
        // dataService.getProjectCustomPropertiesById($stateParams.id).then(function(response){
        //     $scope.customProperties = response.data;
        // });
        dataService.getProjectIncidentsCountById($stateParams.id).then(function(response){
            /*get total count of incidents by project*/
            dataService.getProjectIncidentsById($stateParams.id, response.data).then(function(response){
                $scope.incidents = response.data;
                
                /*Get available years in release.*/
                $scope.years = helperService.getLabelsArray($scope.incidents, 'CreationDate', 'year');

                var prevYear = new Date();
                $scope.selected.year = moment(prevYear.setFullYear(prevYear.getFullYear() - 1)).year();
                
                /*Trigger build*/
                $timeout($scope.build());
            });
        });
        dataService.getProjectReleasesById($stateParams.id).then(function(response){
            $scope.releases = response.data;
        });

        /*Update charts*/
        $scope.build = function(){
            /*Charts refresh*/
            $scope.filterProjectIncidentsByYear();
            $scope.filterReleases();

            /*Reset*/
            $scope.selected.release = null;
            $scope.filteredByRelease = [];
        };

        /*Filtered Project Incidents by Year*/
        $scope.filterProjectIncidentsByYear = function(){
            var filter = [$scope.selected.year, 'filterByYear'];
            var filteredIncidents = $filter('filterFindBy')($scope.incidents, filter);

            
            /*Chart 1 - Reported by Month*/
            $scope.chart1 = helperService.getDataChartObject(filteredIncidents, 
                                            'CreationDate', 
                                            'month', 
                                            'filterByMonth');
            $scope.chart1.options = helperService.getOpsChartObject(0, false, 10, 10);
            $scope.chart1.chart = helperService.setChartObject('chart1', 
                                            'bar', 
                                            $scope.chart1.labels,
                                            $scope.chart1.data,
                                            $scope.chart1.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
            
            /*Filter releases by year.*/
            $scope.releasesVersionNumber = helperService.getLabelsArray(filteredIncidents, 'DetectedReleaseVersionNumber', 'default');
            var filter2 = [$scope.releasesVersionNumber, 'filterReleaseVersionNumber'];
            $scope.releasesNames = $filter('filterFindBy')($scope.releases, filter2);
        };

        /*Filtered Project Incidents by Year Releases*/
        $scope.filterReleases = function(){
            var filter  = [$scope.selected.year, 'filterByYear'],
                filteredIncidents = $filter('filterFindBy')($scope.incidents, filter);

            $scope.chart2 = helperService.getDataChartObject(filteredIncidents, 
                                            'DetectedReleaseVersionNumber', 
                                            'default', 
                                            'filterByReleaseVersionNumber');
            $scope.chart2.options = helperService.getOpsChartObject(1, false, 10, 10);
            $scope.chart2.chart = helperService.setChartObject('chart2', 
                                            'bar', 
                                            $scope.chart2.labels,
                                            $scope.chart2.data,
                                            $scope.chart2.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };

        /*Filtered Project Incidents by Specific Release*/
        $scope.filterReleaseByReleaseVersion = function(release){
            
            var filter = [release.VersionNumber, 'filterByReleaseVersionNumber'];
            $scope.filteredByRelease = $filter('filterFindBy')($scope.incidents, filter);
            
            /*Init Release charts*/
            $scope.filterReleaseByTypeName();
            $scope.filterReleaseByStatus();
            $scope.filterReleaseByOpenerName();
            $scope.filterReleaseByPriority();
            $scope.filterReleaseByOwnerName();
        };

        /*Filtered Release Incidents by Type Name*/
        $scope.filterReleaseByTypeName = function(){

            $scope.chart3 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'IncidentTypeName', 
                                            'default', 
                                            'filterByIncidentTypeName');
            $scope.chart3.options = helperService.getOpsChartObject(2, false, 10, 10);
            $scope.chart3.chart = helperService.setChartObject('chart3', 
                                            'bar', 
                                            $scope.chart3.labels,
                                            $scope.chart3.data,
                                            $scope.chart3.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };

        /*Filtered Release Incidents by Status*/
        $scope.filterReleaseByStatus = function(){

            $scope.chart4 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'IncidentStatusName', 
                                            'default', 
                                            'filterByIncidentStatusName');
            $scope.chart4.options = helperService.getOpsChartObject(3, true, 10, 10);
            $scope.chart4.chart = helperService.setChartObject('chart4', 
                                            'pie', 
                                            $scope.chart4.labels,
                                            $scope.chart4.data,
                                            $scope.chart4.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };
        /*Filtered Release Incidents by Opener*/
        $scope.filterReleaseByOpenerName = function(){

            $scope.chart5 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'OpenerName', 
                                            'default', 
                                            'filterByIncidentOpenerName');
            $scope.chart5.options = helperService.getOpsChartObject(4, false, 10, 8);
            $scope.chart5.chart = helperService.setChartObject('chart5', 
                                            'bar', 
                                            $scope.chart5.labels,
                                            $scope.chart5.data,
                                            $scope.chart5.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            'random');

        };
        /*Filtered Release Incidents by Priority*/
        $scope.filterReleaseByPriority = function(){

            $scope.chart6 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'PriorityName', 
                                            'default', 
                                            'filterByPriorityName');
            $scope.chart6.options = helperService.getOpsChartObject(5, true, 10, 8);
            $scope.chart6.chart = helperService.setChartObject('chart6', 
                                            'pie', 
                                            $scope.chart6.labels,
                                            $scope.chart6.data,
                                            $scope.chart6.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            'random');
        };
        /*Filtered Release Incidents by Owner Name*/
        $scope.filterReleaseByOwnerName = function(){

            $scope.chart7 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'OwnerName', 
                                            'default', 
                                            'filterByOwnerName');
            $scope.chart7.options = helperService.getOpsChartObject(7, false, 10, 8);
            $scope.chart7.chart = helperService.setChartObject('chart7', 
                                            'bar', 
                                            $scope.chart7.labels,
                                            $scope.chart7.data,
                                            $scope.chart7.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            'random');
        };

        $scope.chooseProject = function(project){
            project.Checked = !project.Checked;
            if(!project.Checked) {
                /*Delete from array*/
                $scope.selected.projects.map(function(item){
                    if(item.ProjectId == project.ProjectId) {
                        $scope.selected.projects.splice($scope.selected.projects.indexOf(item), 1);
                        toastrService.info("Project Unselected", project.Name+" unselected.");
                    }
                });
                return;
            } else {
                /*Check if it's not already and push.*/
                var flag = false;
                $scope.selected.projects.map(function(item){
                    if(item.ProjectId == project.ProjectId) {
                        flag = true;
                    }
                });

                if(!flag) {
                    $scope.selected.projects.push(project);
                    toastrService.info("Project", project.Name+" selected.");
                }
            }
        };
        $scope.toggleAllSelect = function(){
            if(!$scope.selectAll){
                $scope.selected.projects = [];
                $scope.projects.map(function(project){
                    project.Checked = true;
                    $scope.selected.projects.push(project);
                });
                $scope.selectAll = true;
                toastrService.info("All Selected", $scope.selected.projects.length+" projects were selected.");
            } else {
                $scope.projects.map(function(project){
                    project.Checked = false;
                });
                $scope.selected.projects = [];
                $scope.selectAll = false;
                toastrService.info("None", "no projects are selected.");
            }
        };
    };

    /*ProjectCtrl Def*/
    app.controller('ProjectCtrl', ['$scope', 
                                    '$stateParams',
                                    'dataService',
                                    '$filter',
                                    '$timeout',
                                    'constantsService',
                                    'helperService',
                                    'toastrService',
                                    app.controllers.projects]);
}());
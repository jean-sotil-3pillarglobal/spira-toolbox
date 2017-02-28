(function() {
    'use strict';

    if (!app.controllers) {
        app.controllers = {};
    }

    /*ProjectCtrl Function*/
    app.controllers.projectsViewer = function($scope, 
                                        $stateParams,
                                        dataService,
                                        $filter,
                                        $timeout,
                                        constantsService,
                                        helperService) {

        $scope.projects  = $stateParams.projects;
        $scope.incidents = [];
        $scope.selected  = {};
        $scope.startDate = null;
        $scope.endDate   = null;
        $scope.loading   = false;

        /*Charts*/
        $scope.chart1 = {};
        $scope.chart2 = {};
        $scope.chart3 = {};
        $scope.chart4 = {};
        $scope.chart5 = {};
        $scope.chart6 = {};
        $scope.chart7 = {};

        $scope.runReviewer = function(){
            var checked = 0;
            $scope.incidents = [];
            $scope.loading = true;

            $($scope.projects).each(function(){
                /*get total count of incidents on project*/
                var dt = dateFormat($scope.startDate, "yyyy-mm-dd")+"T00:00:00.000";

                dataService.getProjectIncidentsCountById(this.ProjectId).then($.proxy(function(response){
                    /*get total count of incidents filtered by CreationDate*/
                    var count = response.data;
                    dataService.getProjectIncidentsByCreationDate(this.ProjectId, count, dt).then(function(response){

                        Array.prototype.push.apply($scope.incidents, response.data);
                        if($scope.projects.length-1 == checked) {
                            $scope.loading = false;
                            $scope.init();
                        }
                        checked++;
                    });
                }, this));
            });
        };

        $scope.init = function(){
            $scope.chartTitle = dateFormat($scope.startDate, "yyyy-mm-dd")+" → "+dateFormat($scope.endDate, "yyyy-mm-dd");
            $scope.incidents = helperService.getIncidentsByDateRanges($scope.incidents, $scope.startDate, $scope.endDate);
            
            /*Call charts*/
            $scope.filterProjectsByMonths();
            $scope.filterProjectsByProjectName();
            $scope.filterProjectsByReleases();
            $scope.filterProjectsByTypeName();
            $scope.filterProjectsByStatus();
            $scope.filterProjectsByOpener();
            $scope.filterProjectsByPriority();
            
        };

        /*Filtered by Release by Month*/
        $scope.filterProjectsByMonths = function(){

            $scope.chart1 = helperService.getDataChartObject($scope.incidents, 
                                            'CreationDate', 
                                            'month', 
                                            'filterByMonth');
            
            $scope.chart1.options = helperService.getOpsChartObject(0, true, 10, 10);
            $scope.chart1.chart = helperService.setChartObject('chart1', 
                                            'bar', 
                                            $scope.chart1.labels,
                                            $scope.chart1.data,
                                            $scope.chart1.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };
        
        /*Filtered by Project Name*/
        $scope.filterProjectsByProjectName = function(){

            $scope.chart2 = helperService.getDataChartObject($scope.incidents, 
                                            'ProjectName', 
                                            'default', 
                                            'filterByReleaseProjectName');
            
            $scope.chart2.options = helperService.getOpsChartObject(6, false, 4, 6.5);
            $scope.chart2.chart = helperService.setChartObject('chart2', 
                                            'bar', 
                                            $scope.chart2.labels,
                                            $scope.chart2.data,
                                            $scope.chart2.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };

        /*Filtered by Releases*/
        $scope.filterProjectsByReleases = function(){
            
            $scope.chart3 = helperService.getDataChartObject($scope.incidents, 
                                            'DetectedReleaseVersionNumber', 
                                            'default', 
                                            'filterByReleaseVersionNumber');
            
            $scope.chart3.options = helperService.getOpsChartObject(1, false, 4, 6);
            $scope.chart3.chart = helperService.setChartObject('chart3', 
                                            'bar', 
                                            $scope.chart3.labels,
                                            $scope.chart3.data,
                                            $scope.chart3.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };

        /*Filtered by Type Name*/
        $scope.filterProjectsByTypeName = function(){
            
            $scope.chart4 = helperService.getDataChartObject($scope.incidents, 
                                            'IncidentTypeName', 
                                            'default', 
                                            'filterByIncidentTypeName');
            
            $scope.chart4.options = helperService.getOpsChartObject(2, false, 4, 6);
            $scope.chart4.chart = helperService.setChartObject('chart4', 
                                            'bar', 
                                            $scope.chart4.labels,
                                            $scope.chart4.data,
                                            $scope.chart4.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };

        /*Filtered by Status*/
        $scope.filterProjectsByStatus = function(){

            $scope.chart5 = helperService.getDataChartObject($scope.incidents, 
                                            'IncidentStatusName', 
                                            'default', 
                                            'filterByIncidentStatusName');
            
            $scope.chart5.options = helperService.getOpsChartObject(3, true, 4, 6);
            $scope.chart5.chart = helperService.setChartObject('chart5', 
                                            'pie', 
                                            $scope.chart5.labels,
                                            $scope.chart5.data,
                                            $scope.chart5.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };

        /*Filtered by Opener*/
        $scope.filterProjectsByOpener = function(){

            $scope.chart6 = helperService.getDataChartObject($scope.incidents, 
                                            'OpenerName', 
                                            'default', 
                                            'filterByIncidentOpenerName');
            
            $scope.chart6.options = helperService.getOpsChartObject(4, false, 4, 5.5);
            $scope.chart6.chart = helperService.setChartObject('chart6', 
                                            'bar', 
                                            $scope.chart6.labels,
                                            $scope.chart6.data,
                                            $scope.chart6.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '', false);
        };

        /*Filtered by Priority*/
        $scope.filterProjectsByPriority = function(){

            $scope.chart7 = helperService.getDataChartObject($scope.incidents, 
                                            'PriorityName', 
                                            'default', 
                                            'filterByPriorityName');
            $scope.chart7.options = helperService.getOpsChartObject(5, true, 4, 10);
            $scope.chart7.chart = helperService.setChartObject('chart7', 
                                            'pie', 
                                            $scope.chart7.labels,
                                            $scope.chart7.data,
                                            $scope.chart7.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };
    };

    /*ProjectViewerCtrl Def*/
    app.controller('ProjectViewerCtrl', ['$scope', 
                                    '$stateParams',
                                    'dataService',
                                    '$filter',
                                    '$timeout',
                                    'constantsService',
                                    'helperService',
                                    app.controllers.projectsViewer]);
}());
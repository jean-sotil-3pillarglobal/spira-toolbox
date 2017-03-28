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
        $scope.tasks = [];
        $scope.tasksByDate = [];
        $scope.startDate = null;
        $scope.properties = [];
        $scope.filteredByRelease = [];
        $scope.years = [];
        $scope.id = parseInt($stateParams.id);

        /*Charts*/
        $scope.chart1 = {};
        $scope.chart2 = {};
        $scope.chart3 = {};
        $scope.chart4 = {};
        $scope.chart5 = {};
        $scope.chart6 = {};
        $scope.chart7 = {};
        $scope.chart8 = {};

        /*Getting global data*/
        if(!isNaN($scope.id)){
            
            dataService.getProjectById($scope.id).then(function(response){
                $scope.project = response.data;
            });
            dataService.getProjectUsersById($scope.id).then(function(response){
                $scope.users = response.data;
            });
            dataService.getProjectIncidentsCountById($scope.id).then(function(response){
                
                /*Custom Properties*/
                dataService.getProjectCustomPropertiesById($scope.id).then(function(response){
                    $.each(response.data, function(i, value){
                        var property = value;
                        
                        /*Values per Custom Properties*/
                        dataService.getProjectCustomPropertiesByValues($scope.id, parseInt(property.CustomPropertyListId)).then(function(response){
                            $scope.properties.push(response.data);
                        });
                    });
                });
                
                /*get total count of incidents by project*/
                dataService.getProjectIncidentsById($scope.id, response.data).then(function(response){
                    $scope.incidents = response.data;
                    
                    /*Get available years in release.*/
                    $scope.years = helperService.getLabelsArray($scope.incidents, 'CreationDate', 'year');

                    var prevYear = new Date();
                    $scope.selected.year = moment(prevYear.setFullYear(prevYear.getFullYear() - 1)).year();
                    
                    /*Trigger build*/
                    $timeout($scope.build());
                });
            });
            dataService.getProjectReleasesById($scope.id).then(function(response){
                $scope.releases = response.data;
            });
            /*get count of task in current project*/
            dataService.getProjectTasks($scope.id).then(function(response){
                $scope.tasks = response.data;
                $scope.startDate = dateFormat(moment($scope.project.CreationDate), "yyyy-mm-dd")+"T00:00:00.000";
                /*get all tasks in current project*/
                dataService.getProjectTasksByCreationDate($scope.id, $scope.tasks, $scope.startDate).then(function(response){
                    $scope.tasksByDate.push(response.data);
                    $scope.tasksByRelease = helperService.getLabelsArray($scope.tasksByDate[0], 'ReleaseVersionNumber', 'default');
                    
                    console.log($scope.tasksByDate);
                    console.log($scope.tasksByRelease);
                });
            });
        };

        

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
            $scope.filteredByYear = $filter('filterFindBy')($scope.incidents, filter);


            /*Chart 1 - Reported by Month*/
            $scope.chart1 = helperService.getDataChartObject($scope.filteredByYear, 
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
            

            /* List of VersionNumber available per filteredYear Incidents.*/
            $scope.releasesNames = helperService.getLabelsArray($scope.filteredByYear, 'DetectedReleaseVersionNumber', 'default');
        };

        /*Filtered Project Incidents by Year Releases*/
        $scope.filterReleases = function(){
            
            $scope.chart2 = helperService.getDataChartObject($scope.filteredByYear, 
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
        $scope.filterReleaseByReleaseVersion = function(versionNumber){
            
            var filter = [versionNumber, 'filterByReleaseVersionNumber'];
            $scope.filteredByRelease = $filter('filterFindBy')($scope.filteredByYear, filter);

            /*Init Release charts*/
            $scope.filterReleaseByTypeName();
            $scope.filterReleaseByStatus();
            $scope.filterReleaseByOpenerName();
            $scope.filterReleaseByPriority();
            $scope.filterReleaseByOwnerName();

            /*Custom Properties*/
            $scope.filterReleaseByDevOwener();
            $scope.filterReleaseByChannel();
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
        /*Filtered Release Incidents by DEV Owener*/
        $scope.filterReleaseByDevOwener = function(){

            $scope.chart8 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'CustomProperties', 
                                            'propsDevOwner', 
                                            'filterByPropsDevOwner',
                                            $scope.users); //Optional Array to retrieve userFullName value.
            $scope.chart8.options = helperService.getOpsChartObject(8, false, 10, 8);
            $scope.chart8.chart = helperService.setChartObject('chart8', 
                                            'bar', 
                                            $scope.chart8.labels,
                                            $scope.chart8.data,
                                            $scope.chart8.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            'random');
        };
        /*Filtered Release Incidents by Channel/Devices*/
        $scope.filterReleaseByChannel = function(){
            
            $scope.chart9 = helperService.getDataChartObject($scope.filteredByRelease, 
                                            'CustomProperties', 
                                            'propsChannel', 
                                            'filterByPropsChannel',
                                            $scope.properties); //Optional Array to retrieve userFullName value.
            $scope.chart9.options = helperService.getOpsChartObject(9, true, 10, 8);
            $scope.chart9.chart = helperService.setChartObject('chart9', 
                                            'pie', 
                                            $scope.chart9.labels,
                                            $scope.chart9.data,
                                            $scope.chart9.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            'random');
        };

        /*Select/Unselect handler*/
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
        /*Select/Unselect All*/
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
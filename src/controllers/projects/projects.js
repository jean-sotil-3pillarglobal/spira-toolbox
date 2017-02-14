(function() {
    if (!app.controllers) app.controllers = {};

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
        $scope.chart5= {};
        $scope.chart6= {};

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
            $scope.filterReleaseByMonths();
            $scope.filterReleases();

            /*Reset*/
            $scope.selected.release = null;
            $scope.filteredByRelease = [];
        };

        /*Filtered by Release by Month*/
        $scope.filterReleaseByMonths = function(){
            var chart1;
            var filter = [$scope.selected.year, 'filterByYear'];
            var filterByYear = $filter('filterFindBy')($scope.incidents, filter);

            /*Filter releases by year.*/
            $scope.releasesVersionNumber = helperService.getLabelsArray(filterByYear, 'DetectedReleaseVersionNumber', 'default');
            var filter2 = [$scope.releasesVersionNumber, 'filterReleaseVersionNumber'];
            $scope.releasesNames = $filter('filterFindBy')($scope.releases, filter2);

            /*Chart 1 - Reported by Month*/
            $scope.chart1.labels = constantsService.APP_PROJECT_MONTHS;
            $scope.chart1.data = helperService.bindArrayWithQuantity($scope.chart1.labels, filterByYear, 'filterByMonth');
            $scope.chart1.display = helperService.validateDataArray($scope.chart1.data);

            /*Chart 1 - Custom Options*/
            $scope.chart1.options = {
                defaultFontStyle:"italic",
                title: {
                    display: true,
                    text: constantsService.CHART_TITLES[0]
                },
                legend:{display:false}
            };

            chart1 = helperService.setChartObject('chart1', 
                                            'bar', 
                                            $scope.chart1.labels,
                                            $scope.chart1.data,
                                            $scope.chart1.options,
                                            'Incidents',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };
        /*Filtered by Releases*/
        $scope.filterReleases = function(){
            var chart2;
            var filter  = [$scope.selected.year, 'filterByYear'];
            var filterByYear = $filter('filterFindBy')($scope.incidents, filter);
            var detectedReleaseVersions = helperService.getLabelsArray(filterByYear, 'DetectedReleaseVersionNumber', 'default');

            /*Chart 2 - Reported by Releases*/
            $scope.chart2.labels = detectedReleaseVersions;
            $scope.chart2.data = helperService.bindArrayWithQuantity(detectedReleaseVersions, $scope.incidents, 'filterByReleaseVersionNumber');
            $scope.chart2.display = helperService.validateDataArray($scope.chart2.data);
            
            /*Chart 2 - Custom Options*/
            $scope.chart2.options = {
                defaultFontSize:4,
                title: {
                    display: true,
                    text: constantsService.CHART_TITLES[1]
                },
                legend:{
                    display:false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 8
                        }
                    }]
                }
            };

            chart2 = helperService.setChartObject('chart2', 
                                            'bar', 
                                            $scope.chart2.labels,
                                            $scope.chart2.data,
                                            $scope.chart2.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');
        };
        /*Filtered Release Incidents by Type*/
        $scope.filterReleaseByReleaseVersion = function(release){
            var chart3;
            var filter = [release.VersionNumber, 'filterByReleaseVersionNumber'];
            $scope.filteredByRelease = $filter('filterFindBy')($scope.incidents, filter);
            var detectedIncidentTypes = helperService.getLabelsArray($scope.filteredByRelease, 'IncidentTypeName', 'default');

            /*Chart 3 - Reported by Releases*/
            $scope.chart3.labels = detectedIncidentTypes;
            $scope.chart3.data = helperService.bindArrayWithQuantity(detectedIncidentTypes, $scope.filteredByRelease, 'filterByIncidentTypeName');
            $scope.chart3.display = helperService.validateDataArray($scope.chart3.data);
            
            /*Chart 3 - Custom Options*/
            $scope.chart3.options = {
                title: {
                    display: true,
                    text: constantsService.CHART_TITLES[2]
                },
                legend:{display:false},
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 8
                        }
                    }]
                }
            };

            chart3 = helperService.setChartObject('chart3', 
                                            'bar', 
                                            $scope.chart3.labels,
                                            $scope.chart3.data,
                                            $scope.chart3.options,
                                            '',
                                            constantsService.CHART_COLORS[0],
                                            constantsService.CHART_COLORS[1],
                                            '');

            /*Re-use filteredByRelease variable*/
            $scope.filterReleaseByStatus();
            $scope.filterReleaseByOpenerName();
            $scope.filterReleaseByPriority();
        };
        /*Filtered Release Incidents by Status*/
        $scope.filterReleaseByStatus = function(){
            var chart4;
            var detectedIncidentStatus = helperService.getLabelsArray($scope.filteredByRelease, 'IncidentStatusName', 'default');

            /*Chart 4 - Reported by Releases*/
            $scope.chart4.labels = detectedIncidentStatus;
            $scope.chart4.data = helperService.bindArrayWithQuantity(detectedIncidentStatus, $scope.filteredByRelease, 'filterByIncidentStatusName');
            $scope.chart4.display = helperService.validateDataArray($scope.chart4.data);
            
            /*Chart 4 - Custom Options*/
            $scope.chart4.options = {
                title: {
                    display: true,
                    text: constantsService.CHART_TITLES[3]
                },
                legend:{display:true}
            };

            chart4 = helperService.setChartObject('chart4', 
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
            var chart5;
            var detectedIncidentName = helperService.getLabelsArray($scope.filteredByRelease, 'OpenerName', 'default');

            /*Chart 5 - Reported by Releases*/
            $scope.chart5.labels = detectedIncidentName;
            $scope.chart5.data = helperService.bindArrayWithQuantity(detectedIncidentName, $scope.filteredByRelease, 'filterByIncidentOpenerName');
            $scope.chart5.display = helperService.validateDataArray($scope.chart5.data);
            
            /*Chart 5 - Custom Options*/
            $scope.chart5.options = {
                title: {
                    display: true,
                    text: constantsService.CHART_TITLES[4]
                },
                legend:{display:false},
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 8
                        }
                    }]
                }
            };

            chart5 = helperService.setChartObject('chart5', 
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
            var chart6;
            var detectedIncidentPriority = helperService.getLabelsArray($scope.filteredByRelease, 'PriorityName', 'default');

            /*Chart 6 - Reported by Releases*/
            $scope.chart6.labels = detectedIncidentPriority;
            $scope.chart6.data = helperService.bindArrayWithQuantity(detectedIncidentPriority, $scope.filteredByRelease, 'filterByPriorityName');
            $scope.chart6.display = helperService.validateDataArray($scope.chart6.data);
            
            /*Chart 6 - Custom Options*/
            $scope.chart6.options = {
                title: {
                    display: true,
                    text: constantsService.CHART_TITLES[5]
                },
                legend:{display:true}
            };

            chart6 = helperService.setChartObject('chart6', 
                                            'pie', 
                                            $scope.chart6.labels,
                                            $scope.chart6.data,
                                            $scope.chart6.options,
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
                    };
                });
                return;
            } else {
                /*Check if it's not already and push.*/
                var flag = false;
                $scope.selected.projects.map(function(item){
                    if(item.ProjectId == project.ProjectId) flag = true;
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
        }
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
}())
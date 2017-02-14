(function() {
    if (!app.controllers) app.controllers = {};

    /*ProjectCtrl Function*/
    app.controllers.projectsViewer = function($scope, 
                                        $stateParams,
                                        dataService,
                                        $filter,
                                        $timeout,
                                        constantsService,
                                        helperService) {

        $scope.projects = $stateParams.projects;
        $scope.incidents = [];
        $scope.filterBy;
        $scope.selected = {};
        $scope.startDate;
        $scope.endDate;
        $scope.loading = false;

        /*Charts*/
        $scope.chart1 = {};
        $scope.chart2 = {};
        $scope.chart3 = {};
        $scope.chart4 = {};
        $scope.chart5 = {};
        $scope.chart6 = {};

        $scope.$watch('selected.date', function() {
            $scope.getDates();
        });
        $scope.$watch('filterBy', function() {
            $scope.getDates();
        });

        $scope.runReviewer = function(){
            var checked = 0;
            $scope.incidents = [];
            $scope.loading = true;

            /*clear data*/
            if($scope.chart1.chart){
                alert("here");
                $scope.chart1.chart.update();
                $scope.chart2.chart.update();
                $scope.chart3.chart.update();
            }

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
            $scope.filterReleaseByMonths();
            $scope.filterByReleases();
            $scope.filterByProjectName();
            
        };

        /*Filtered by Release by Month*/
        $scope.filterReleaseByMonths = function(){
            $scope.chart1 = {};
            $scope.chart1.labels = helperService.getLabelsArray($scope.incidents, 'CreationDate', 'month');
            $scope.chart1.data = helperService.bindArrayWithQuantity($scope.chart1.labels, $scope.incidents, 'filterByMonth');
            $scope.chart1.display = helperService.validateDataArray($scope.chart1.data);
            
            /*Chart 1 - Custom Options*/
            $scope.chart1.options = {
                defaultFontStyle:"italic",
                title: {
                    display: true,
                    text: ""
                },
                legend:{display:true}
            };

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
        $scope.filterByProjectName = function(){
            $scope.chart2 = {};
            $scope.chart2.labels = helperService.getLabelsArray($scope.incidents, 'ProjectName', 'default');
            $scope.chart2.data = helperService.bindArrayWithQuantity($scope.chart2.labels, $scope.incidents, 'filterByReleaseProjectName');
            $scope.chart2.display = helperService.validateDataArray($scope.chart2.data);
            
            /*Chart 3 - Custom Options*/
            $scope.chart2.options = {
                defaultFontSize:4,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 8
                        }
                    }]
                },
                defaultFontStyle:"italic",
                title: {
                    display: true,
                    text: ""
                },
                legend:{display:false}
            };

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
        $scope.filterByReleases = function(){
            $scope.chart3 = {};
            $scope.chart3.labels = helperService.getLabelsArray($scope.incidents, 'DetectedReleaseVersionNumber', 'default');
            $scope.chart3.data = helperService.bindArrayWithQuantity($scope.chart3.labels, $scope.incidents, 'filterByReleaseVersionNumber');
            $scope.chart3.display = helperService.validateDataArray($scope.chart3.data);
            
            /*Chart 2 - Custom Options*/
            $scope.chart3.options = {
                defaultFontSize:4,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 7
                        }
                    }]
                },
                defaultFontStyle:"italic",
                title: {
                    display: true,
                    text: ""
                },
                legend:{display:false}
            };

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



        /*Utils*/
        $scope.getDates = function(){
            switch($scope.filterBy){
                case 'month': //weekly
                    $scope.getWeekDates();
                break;
                case 'year': //monthly
                    $scope.getMonthDates();
                break;
                case 'decade': //yearly
                    $scope.getYearDates();
                break;
            };
        };

        $scope.getWeekDates = function(){
            var date = moment($scope.selected.date);
            while(date.day()) {
                date.subtract(1, 'days');
            }
            $scope.startDate = date.format("YYYY-MM-DD");
            $scope.endDate = date.add(6, 'days').format("YYYY-MM-DD");
        }

        $scope.getMonthDates = function(){
            var date = moment($scope.selected.date);
            while(date.day()) {
                date.subtract(1, 'days');
            }
            $scope.startDate = date.format("YYYY-MM-DD");
            $scope.endDate = date.add(1, 'months').format("YYYY-MM-DD");
        }

        $scope.getYearDates = function(){
            var date = moment($scope.selected.date);
            while(date.day()) {
                date.subtract(1, 'days');
            }
            $scope.startDate = date.format("YYYY-MM-DD");
            $scope.endDate = date.add(1, 'years').format("YYYY-MM-DD");
        }
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
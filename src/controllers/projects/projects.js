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
        $scope.years = [];

        /*Charts*/
        $scope.chart1 = {};
        $scope.chart2 = {};
        $scope.chart3 = {};
        $scope.chart4 = {};
        $scope.chart5= {};

        /*Getting global data*/
        dataService.getProjectById($stateParams.id).then(function(response){
            $scope.project = response.data;
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
                
                /*Get available years in release.*/
                $scope.years = $scope.getLabelsArray($scope.incidents, 'CreationDate', 'year');

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

        /*Functions*/
        /*Filtered by Release by Month*/
        $scope.filterReleaseByMonths = function(){
            var chart1 = $scope.getChartObject('chart1');

            var filter = [$scope.selected.year, 'filterByYear'];
            var filterByYear = $filter('filterFindBy')($scope.incidents, filter);

            /*Filter releases by year.*/
            $scope.releasesVersionNumber = $scope.getLabelsArray(filterByYear, 'DetectedReleaseVersionNumber', 'default');
            var filter2 = [$scope.releasesVersionNumber, 'filterReleaseVersionNumber'];
            $scope.releasesNames = $filter('filterFindBy')($scope.releases, filter2);

            /*Chart 1 - Reported by Month*/
            $scope.chart1.labels = constantsService.APP_PROJECT_MONTHS;
            $scope.chart1.data = $scope.bindArrayWithQuantity($scope.chart1.labels, filterByYear, 'filterByMonth');
            $scope.chart1.display = $scope.validateDataArray($scope.chart1.data);

            /*Chart 1 - Custom Options*/
            $scope.chart1.options = {
                defaultFontStyle:"italic",
                title: {
                    display: true,
                    text: 'Total Incidents Reported By Year'
                }
            };

        };
        /*Filtered by Releases*/
        $scope.filterReleases = function(){
            var filter  = [$scope.selected.year, 'filterByYear'];
            var filterByYear = $filter('filterFindBy')($scope.incidents, filter);
            var detectedReleaseVersions = $scope.getLabelsArray(filterByYear, 'DetectedReleaseVersionNumber', 'default');

            /*Chart 2 - Reported by Releases*/
            $scope.chart2.labels = detectedReleaseVersions;
            $scope.chart2.data = $scope.bindArrayWithQuantity(detectedReleaseVersions, $scope.incidents, 'filterByReleaseVersionNumber');
            $scope.chart2.display = $scope.validateDataArray($scope.chart2.data);
            
            /*Chart 2 - Custom Options*/
            $scope.chart2.options = {
                title: {
                    display: true,
                    text: 'Total Incidents Reported By Release'
                }
            };
        };
        /*Filtered Release Incidents by Type*/
        $scope.filterReleaseByReleaseVersion = function(release){
            var filter = [release.VersionNumber, 'filterByReleaseVersionNumber'];
            $scope.filteredByRelease = $filter('filterFindBy')($scope.incidents, filter);
            var detectedIncidentTypes = $scope.getLabelsArray($scope.filteredByRelease, 'IncidentTypeName', 'default');

            /*Chart 3 - Reported by Releases*/
            $scope.chart3.labels = detectedIncidentTypes;
            $scope.chart3.data = $scope.bindArrayWithQuantity(detectedIncidentTypes, $scope.filteredByRelease, 'filterByIncidentTypeName');
            $scope.chart3.display = $scope.validateDataArray($scope.chart3.data);
            
            /*Chart 3 - Custom Options*/
            $scope.chart3.options = {
                title: {
                    display: true,
                    text: 'Total Release Incidents Reported By Type'
                }
            };

            /*Re-use filteredByRelease variable*/
            $scope.filterReleaseByStatus();
            $scope.filterReleaseByOpenerName();
        };
        /*Filtered Release Incidents by Status*/
        $scope.filterReleaseByStatus = function(release){
            var detectedIncidentStatus = $scope.getLabelsArray($scope.filteredByRelease, 'IncidentStatusName', 'default');

            /*Chart 4 - Reported by Releases*/
            $scope.chart4.labels = detectedIncidentStatus;
            $scope.chart4.data = $scope.bindArrayWithQuantity(detectedIncidentStatus, $scope.filteredByRelease, 'filterByIncidentStatusName');
            $scope.chart4.display = $scope.validateDataArray($scope.chart4.data);
            
            /*Chart 4 - Custom Options*/
            $scope.chart4.options = {
                title: {
                    display: true,
                    text: 'Total Release Incidents Reported By Status'
                }
            };
        };
        /*Filtered Release Incidents by Opener*/
        $scope.filterReleaseByOpenerName = function(release){
            var detectedIncidentName = $scope.getLabelsArray($scope.filteredByRelease, 'OpenerName', 'default');

            /*Chart 5 - Reported by Releases*/
            $scope.chart5.labels = detectedIncidentName;
            $scope.chart5.data = $scope.bindArrayWithQuantity(detectedIncidentName, $scope.filteredByRelease, 'filterByIncidentOpenerName');
            $scope.chart5.display = $scope.validateDataArray($scope.chart5.data);
            
            /*Chart 5 - Custom Options*/
            $scope.chart5.options = {
                title: {
                    display: true,
                    text: 'Total Release Incidents Reported By Opener'
                }
            };
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
        $scope.getLabelsArray = function(array, index, type){
            var container = [];
            $(array).each(function(i, value){
                switch(type){
                    case 'default':
                        if(container.indexOf(value[index]) == -1 && value[index]) container.push(value[index]);
                    break;
                    case 'year':
                        var year = moment(value[index]).year();
                        if(container.indexOf(year) == -1 && year) container.push(year);
                    break;
                }
            });
            return container;
        };
        $scope.validateDataArray = function(array){
            var empty = false;

            if(array.length == 0) return empty;
            array.map(function(item){
                if(item != 0) empty = true;
            });
            return empty;
        };
        /*Get Chart.js Object*/
        $scope.getChartObject = function(id){
            var chart = new Chart($('#'+id).get(0).getContext('2d'));
            return chart;
        }

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

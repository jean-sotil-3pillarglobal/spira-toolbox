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
        $scope.tasksByDate = null;
        $scope.startDate = null;
        $scope.properties = [];
        $scope.filteredByRelease = [];
        $scope.releaseTask = [];
        $scope.years = [];
        $scope.id = parseInt($stateParams.id);

        /*Charts*/
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
                    $scope.tasksByDate = response.data;
                });
            });
        }

        

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

            var obj = {
                name : 'chart1',
                description: 'incidents',
                attr : 'CreationDate',
                type : 'month',
                filter : 'filterByMonth',
                title : 0,
                label : false,
                fontSize : 10,
                xAxesFontsize : 10,
                chartType : 'bar',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : ''
            };

            /*Chart 1*/
            $scope[obj.name] = helperService.createChart($scope.filteredByYear, obj);
            
            /* List of VersionNumber available per filteredYear Incidents.*/
            $scope.releasesNames = helperService.getLabelsArray($scope.filteredByYear, 'DetectedReleaseVersionNumber', 'default');
        };

        /*Filtered Project Incidents by Year Releases*/
        $scope.filterReleases = function(){

            var obj = {
                name : 'chart2',
                description: '',
                attr : 'DetectedReleaseVersionNumber',
                type : 'default',
                filter : 'filterByReleaseVersionNumber',
                title : 1,
                label : false,
                fontSize : 10,
                xAxesFontsize : 10,
                chartType : 'bar',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : ''
            };

            /*Chart 2*/
            $scope[obj.name] = helperService.createChart($scope.filteredByYear, obj);
            
        };

        /*Filtered Project Incidents by Specific Release*/
        $scope.filterReleaseByReleaseVersion = function(versionNumber){
            
            var filterIncidents = [versionNumber, 'filterByReleaseVersionNumber'],
                filterTask = [versionNumber, 'filterTasksReleaseVersionNumber'];

            $scope.filteredByRelease = $filter('filterFindBy')($scope.incidents, filterIncidents);
            $scope.filteredByReleaseTask = $filter('filterFindBy')($scope.tasksByDate, filterTask);
            

            console.log(helperService.getLabelsArray($scope.filteredByReleaseTask, 'OwnerName', 'default'));
            
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

            var obj = {
                name : 'chart3',
                description: '',
                attr : 'IncidentTypeName',
                type : 'default',
                filter : 'filterByIncidentTypeName',
                title : 2,
                label : false,
                fontSize : 10,
                xAxesFontsize : 10,
                chartType : 'bar',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : ''
            };

            /*Chart 3*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj);

        };

        /*Filtered Release Incidents by Status*/
        $scope.filterReleaseByStatus = function(){

            var obj = {
                name : 'chart4',
                description: '',
                attr : 'IncidentStatusName',
                type : 'default',
                filter : 'filterByIncidentStatusName',
                title : 3,
                label : true,
                fontSize : 10,
                xAxesFontsize : 10,
                chartType : 'pie',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : ''
            };

            /*Chart 4*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj);

        };

        /*Filtered Release Incidents by Opener*/
        $scope.filterReleaseByOpenerName = function(){

            var obj = {
                name : 'chart5',
                description: '',
                attr : 'OpenerName',
                type : 'default',
                filter : 'filterByIncidentOpenerName',
                title : 4,
                label : false,
                fontSize : 10,
                xAxesFontsize : 8,
                chartType : 'bar',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : 'random'
            };

            /*Chart 5*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj);

        };

        /*Filtered Release Incidents by Priority*/
        $scope.filterReleaseByPriority = function(){

            var obj = {
                name : 'chart6',
                description: '',
                attr : 'PriorityName',
                type : 'default',
                filter : 'filterByPriorityName',
                title : 5,
                label : true,
                fontSize : 10,
                xAxesFontsize : 8,
                chartType : 'pie',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : 'random'
            };

            /*Chart 6*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj);

        };

        /*Filtered Release Incidents by Owner Name*/
        $scope.filterReleaseByOwnerName = function(){

            var obj = {
                name : 'chart7',
                description: '',
                attr : 'OwnerName',
                type : 'default',
                filter : 'filterByOwnerName',
                title : 7,
                label : false,
                fontSize : 10,
                xAxesFontsize : 8,
                chartType : 'bar',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : 'random'
            };

            /*Chart 7*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj);

        };

        /*Filtered Release Incidents by DEV Owener*/
        $scope.filterReleaseByDevOwener = function(){

            var obj = {
                name : 'chart8',
                description: '',
                attr : 'CustomProperties',
                type : 'propsDevOwner',
                filter : 'filterByPropsDevOwner',
                title : 8,
                label : false,
                fontSize : 10,
                xAxesFontsize : 8,
                chartType : 'bar',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : 'random'
            };

            /*Chart 8*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj, $scope.users);

        };

        /*Filtered Release Incidents by Channel/Devices*/
        $scope.filterReleaseByChannel = function(){

            var obj = {
                name : 'chart9',
                description: '',
                attr : 'CustomProperties',
                type : 'propsChannel',
                filter : 'filterByPropsChannel',
                title : 9,
                label : true,
                fontSize : 10,
                xAxesFontsize : 8,
                chartType : 'pie',
                defaultColor1 : 0,
                defaultColor2 : 1,
                anim : 'random'
            };

            /*Chart 9*/
            $scope[obj.name] = helperService.createChart($scope.filteredByRelease, obj, $scope.properties);
            
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
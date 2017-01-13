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


        /*Charts*/
        // $scope.chart1 = {};
        // $scope.chart2 = {};
        // $scope.chart3 = {};
        // $scope.chart4 = {};
        // $scope.chart5= {};
        // $scope.chart6= {};

        /*Getting global data - $stateParams.projects*/
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
}())
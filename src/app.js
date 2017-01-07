if (!app) var app = angular.module('myApp', ['ui.router', 
                                             'ui.mask', 
                                             'LocalStorageModule',
                                             'ngResource',
                                             'ngSanitize',
                                             'nya.bootstrap.select',
                                             'chart.js']);

/*ui-router routes*/
app.config(['$stateProvider','$urlRouterProvider', '$sceDelegateProvider', 'ChartJsProvider',
	function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, ChartJsProvider) { 
        $stateProvider.
            state('auth', {
                url: '/auth',
                controller: 'AuthCtrl',
                controllerAs: 'mv',
                templateUrl: './views/home/auth.html'
            }).
            state('app', {
            	url: '/app',
            	templateUrl : './views/home/home.html'
            }).
            state('app.projects', {
                url: '/projects',
                templateUrl : './views/projects/projectList.html'
            }).
            state('app.releases', {
                url: "/projects/:id",
                templateUrl : './views/projects/projectReleases.html',
                controllerAs : "mv",
                controller : "ProjectCtrl"
            });

            $urlRouterProvider.otherwise('/');

            /*ChartJsProvider*/
            ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]);
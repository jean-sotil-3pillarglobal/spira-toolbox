if (!app) var app = angular.module('myApp', ['ui.router', 
                                             'ui.mask', 
                                             'LocalStorageModule',
                                             'ngResource',
                                             'ngSanitize',
                                             'nya.bootstrap.select']);

/*ui-router routes*/
app.config(['$stateProvider','$urlRouterProvider', '$sceDelegateProvider',
	function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) { 
        $stateProvider.
            state('auth', {
                url: '/auth',
                controller: 'AuthCtrl',
                controllerAs: 'mv',
                templateUrl: './views/home/auth.html'
            }).
            state('app', {
            	url: '/app',
            	templateUrl : './views/home/home.html',
                controllerAs: "mv"
            }).
            state('app.projects', {
                url: '/projects',
                templateUrl : './views/projects/projectList.html',
                controllerAs : "mv"
            }).
            state('app.releases', {
                url: "/projects/:id",
                templateUrl : './views/projects/projectReleases.html',
                controllerAs : "mv",
                controller : "ProjectCtrl"
            });

            $urlRouterProvider.otherwise('/');
}]);
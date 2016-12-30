if (!app) var app = angular.module('myApp', ['ui.router', 'ui.mask']);

/*ui-router routes*/
app.config(['$stateProvider','$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) { 
        $stateProvider.
            state('auth', {
                url: '/auth',
                controller: 'AuthCtrl',
                controllerAs: 'mv',
                templateUrl: './views/home/auth.html'
            }).
            state('me', {
            	url: '/me',
            	templateUrl : './views/home/home.html',
            	resolve:{
            		projects:function(){
            			return "here is a project!";
            		}
            	}
            }).
            state('me.projects', {
            	url: '/projects',
            	templateUrl : './views/projects/projectList.html'
            });
}]);
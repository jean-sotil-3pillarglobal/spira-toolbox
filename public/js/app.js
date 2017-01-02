if(!app)var app=angular.module("myApp",["ui.router","ui.mask"]);app.config(["$stateProvider","$urlRouterProvider","$sceDelegateProvider",function(e,t,r){e.state("auth",{url:"/auth",controller:"AuthCtrl",controllerAs:"mv",templateUrl:"./views/home/auth.html"}).state("me",{url:"/me",templateUrl:"./views/home/home.html",resolve:{projects:function(){return"here is a project!"}}}).state("me.projects",{url:"/projects",templateUrl:"./views/projects/projectList.html"})}]);

!function(){app.controllers||(app.controllers={}),app.controllers.admin=function(n,o,t){n.init=function(){t.isLoggedAlready()?o.transitionTo("me"):o.transitionTo("auth")}},app.controller("AdminCtrl",["$scope","$state","authService",app.controllers.admin])}();
!function(){app.controllers||(app.controllers={}),app.controllers.auth=function(t,e,r,n,o,c){t.submit=function(){r.authUser(t.username,t.token).then(function(t){"200"==t.status&&(o.success(c.APP_AUTH_SUCCESS_TITLE,c.APP_AUTH_SUCCESS_MESSAGE),n.createCredentials(),e.transitionTo("me"))}).catch(function(t){o.error(c.APP_AUTH_ERROR_TITLE,c.APP_AUTH_ERROR_MESSAGE)})}},app.controller("AuthCtrl",["$scope","$state","dataService","authService","toastrService","constantsService",app.controllers.auth])}();
!function(){app.controllers||(app.controllers={}),app.controllers.header=function(n,t){n.mv.items=t.APP_NAVIGATION,n.mv.isActive=function(n){return 1==n?"active":""}}}();


!function(){function n(){var n=function(){return!1},r=function(){return!1};return{createCredentials:n,isLoggedAlready:r}}app.factory("authService",n)}();
!function(){var e={APP_TITLE:"Spira Toolbox",APP_DESCRIPTION:"Great for learning Angular features.",APP_VERSION:"1.0",APP_NAVIGATION:[{state:"me",header:"Me",active:!0},{state:"projects",header:"Projects",active:!1},{state:"charts",header:"Charts",active:!1}],APP_AUTH_SUCCESS_TITLE:"Awesome.",APP_AUTH_SUCCESS_MESSAGE:"You were successfully authenticated.",APP_AUTH_ERROR_TITLE:"Oh no!.",APP_AUTH_ERROR_MESSAGE:"Please provide valid user information."};app.constant("constantsService",e)}();
!function(){function r(r,t,e){var n=function(t,e){var n=a(r.PROJECTS,t,e);return u(n)},c=function(){return[]},u=function(r){return t({method:"JSONP",url:e.trustAsResourceUrl(r),callbackKey:"callback"})},a=function(r,t,e){return r+"?username="+t+"&api-key="+e};return{authUser:n,getAllProjects:c}}r.$inject=["apiService","$http","$sce"],app.factory("dataService",r)}();
!function(){function r(){var r=function(r,t){toastr.success(t,r)},t=function(r,t){toastr.info(t,r)},o=function(r,t){toastr.error(t,r)};return{success:r,info:t,error:o}}app.factory("toastrService",r)}();
!function(){var e={PROJECTS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects"};app.constant("apiService",e)}();


!function(){app.component("appheader",{templateUrl:"./views/commons/header.html",controllerAs:"mv",controller:["$scope","constantsService",app.controllers.header]})}();

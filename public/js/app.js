if(!app)var app=angular.module("myApp",["ui.router","ui.mask"]);app.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("auth",{url:"/auth",controller:"AuthCtrl",controllerAs:"mv",templateUrl:"./views/home/auth.html"}).state("me",{url:"/me",templateUrl:"./views/home/home.html",resolve:{projects:function(){return"here is a project!"}}}).state("me.projects",{url:"/projects",templateUrl:"./views/projects/projectList.html"})}]);

!function(){app.controllers||(app.controllers={}),app.controllers.admin=function(o,n,t){o.init=function(){t.isLoggedAlready()?n.go("home"):n.go("auth")}},app.controller("AdminCtrl",["$scope","$state","authService",app.controllers.admin])}();
!function(){app.controllers||(app.controllers={}),app.controllers.auth=function(t,e,n,o,r){t.submit=function(){n.authUser(t.username,t.token).then(function(t){"200"==t.status&&(r.success("Logged in","Successfully authenticated."),o.createCredentials(),e.transitionTo("me.projects"))}).catch(function(t){r.error("Authentication failed","Please provide valid user information.")})}},app.controller("AuthCtrl",["$scope","$state","dataService","authService","toastrService",app.controllers.auth])}();


!function(){function n(){var n=function(){return!1},r=function(){return!1};return{createCredentials:n,isLoggedAlready:r}}app.factory("authService",n)}();
!function(){var a={APP_TITLE:"My app",APP_DESCRIPTION:"Great for learning Angular features.",APP_VERSION:"1.0"};app.constant("constantsService",a)}();
!function(){function t(t,n){var r=function(n,r){var e=a(t.PROJECTS,n,r);return u(e,"GET")},e=function(){return[]},u=function(t,r){return n({url:t,method:r,dataType:"jsonp"})},a=function(t,n,r){return t+"?username="+n+"&api-key="+r};return{authUser:r,getAllProjects:e}}t.$inject=["apiService","$http"],app.factory("dataService",t)}();
!function(){function r(){var r=function(r,t){toastr.success(t,r)},t=function(r,t){toastr.info(t,r)},o=function(r,t){toastr.error(t,r)};return{success:r,info:t,error:o}}app.factory("toastrService",r)}();
!function(){var e={PROJECTS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects"};app.constant("apiService",e)}();
!function(){app.component("appheader",{templateUrl:"./views/commons/header.html",bindings:{}})}();



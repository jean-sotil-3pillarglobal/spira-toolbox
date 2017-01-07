if(!app)var app=angular.module("myApp",["ui.router","ui.mask","LocalStorageModule","ngResource","ngSanitize","nya.bootstrap.select","chart.js"]);app.config(["$stateProvider","$urlRouterProvider","$sceDelegateProvider","ChartJsProvider",function(e,t,r,o){e.state("auth",{url:"/auth",controller:"AuthCtrl",controllerAs:"mv",templateUrl:"./views/home/auth.html"}).state("app",{url:"/app",templateUrl:"./views/home/home.html"}).state("app.projects",{url:"/projects",templateUrl:"./views/projects/projectList.html"}).state("app.releases",{url:"/projects/:id",templateUrl:"./views/projects/projectReleases.html",controllerAs:"mv",controller:"ProjectCtrl"}),t.otherwise("/"),o.setOptions({colors:["#803690","#00ADF9","#DCDCDC","#46BFBD","#FDB45C","#949FB1","#4D5360"]})}]);
!function(){app.controllers||(app.controllers={}),app.controllers.admin=function(t,o,n,e,i,r,c){t.init=function(){n(function(){r.isLoggedAlready()?o.transitionTo("app.projects"):o.transitionTo("auth")})},t.logOut=function(){r.deleteCredentials(),n(function(){o.transitionTo("auth")})},t.parseHTML=function(t){t.HTMLDescription=e.trustAsHtml(t.Description)},t.projects=c.get("projects")},app.controller("AdminCtrl",["$scope","$state","$timeout","$sce","dataService","authService","localStorageService",app.controllers.admin])}();
!function(){app.controllers||(app.controllers={}),app.controllers.auth=function(t,e,o,r,n,a,c,s){t.submit=function(){r.authUser(t.username,t.token).then(function(r){o(function(){"200"==r.status&&(a.success(c.APP_AUTH_SUCCESS_TITLE,c.APP_AUTH_SUCCESS_MESSAGE),n.createCredentials(t.username,t.token),s.set("projects",r.data),e.transitionTo("app.projects"))})}).catch(function(t){a.error(c.APP_AUTH_ERROR_TITLE,c.APP_AUTH_ERROR_MESSAGE)})}},app.controller("AuthCtrl",["$scope","$state","$timeout","dataService","authService","toastrService","constantsService","localStorageService",app.controllers.auth])}();
!function(){app.controllers||(app.controllers={}),app.controllers.header=function(e,n,r){e.mv.items=n.APP_NAVIGATION,e.mv.username=r.get("username")}}();

!function(){app.controllers||(app.controllers={}),app.controllers.projects=function(e,t,a,n,r,s){e.projectId=t.id,e.selected={},e.releases=[],e.users=[],e.project=[],e.incidents=[],e.incidentsTypes=[],e.filteredByRelease=[],e.years=s.APP_PROJECT_YEARS,e.selected.year=e.years[0],e.chart1={},e.chart2={},a.getProjectById(t.id).then(function(t){e.project=t.data}),a.getProjectReleasesById(t.id).then(function(t){e.releases=t.data}),a.getProjectUsersById(t.id).then(function(t){e.users=t.data}),a.getProjectIncidentsTypeById(t.id).then(function(t){e.incidentsTypes=t.data}),a.getProjectIncidentsCountById(t.id).then(function(n){a.getProjectIncidentsById(t.id,n.data).then(function(t){e.incidents=t.data,r(e.updateValues())})}),e.updateValues=function(){e.filterReleaseByMonths(),e.filterReleases()},e.filterReleaseById=function(t){var a=[t,"DetectedReleaseId"];e.filteredByRelease=n("filterFindBy")(e.incidents,a)},e.filterReleaseByMonths=function(){var t=[e.selected.year,"DetectedReleaseByYear"],a=n("filterFindBy")(e.incidents,t);e.chart1.labels=s.APP_PROJECT_MONTHS,e.chart1.series=["Incidents Reported"],e.chart1.data=e.bindArrayWithQuantity(e.chart1.labels,a,"DetectedReleaseByMonth")},e.filterReleases=function(){var t=[e.selected.year,"DetectedReleaseByYear"],a=n("filterFindBy")(e.incidents,t),r=e.getLabelsArray(a,"DetectedReleaseId");e.chart2.labels=e.bindArrayWithValue(r,e.releases,"DetectedReleaseValues"),e.chart2.series=["Incidents Reported By Releases"],console.log(r),console.log(e.chart2.labels),e.chart2.data=e.bindArrayWithQuantity(r,a,"DetectedReleaseId")},e.bindArrayWithQuantity=function(e,t,a){var r=[];return $(e).each(function(e,s){var i=[s,a],c=n("filterFindBy")(t,i);r.push(c.length)}),r},e.bindArrayWithValue=function(e,t,a){var r=[];return $(e).each(function(e,s){var i=[s,a],c=n("filterFindBy")(t,i);r.push(c)}),r},e.getLabelsArray=function(e,t){var a=[];return $(e).each(function(e,n){a.indexOf(n[t])==-1&&n[t]&&a.push(n[t])}),a}},app.controller("ProjectCtrl",["$scope","$stateParams","dataService","$filter","$timeout","constantsService",app.controllers.projects])}();

!function(){app.filter("trust",["$sce",function(t){return function(n){return t.trustAsHtml(n)}}])}();
!function(){app.filter("filterFindBy",["constantsService",function(e){return function(t,a){for(var n=[],r=a[0],s=a[1],o=0;o<t.length;o++){var c=t[o];switch(s){case"DetectedReleaseId":c[s]==r&&n.push(c);break;case"DetectedReleaseByMonth":Date.prototype.monthNames=e.APP_PROJECT_MONTHS,Date.prototype.getMonthName=function(){return this.monthNames[this.getMonth()]};var i=new Date(moment(c.CreationDate)).getMonthName();i==r&&n.push(c);break;case"DetectedReleaseByYear":var h=moment(new Date(moment(c.CreationDate))).year();h==r&&n.push(c);break;case"DetectedReleaseValues":c.ReleaseId==r&&n.push(c.VersionNumber.substring(0,6)+"-"+c.ReleaseId)}}return n}}])}();
!function(){var e={PROJECTS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects?",PROJECT:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}?",PROJECT_RELEASES:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/releases?",PROJECT_USERS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/users?",PROJECT_INCIDENTS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/search?start_row=0&number_rows={1}&",PROJECT_INCIDENTS_TYPES:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/types?",PROJECT_INCIDENTS_COUNT:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/count?"};app.constant("apiService",e)}();
!function(){function e(e){var t=$.proxy(function(t,n){e.set("username",t),e.set("token",n)},this),n=function(){return void 0!=r()},r=$.proxy(function(){return e.get("username")},this),o=$.proxy(function(){return e.get("token")},this),i=function(){e.remove("projects"),e.remove("username"),e.remove("token")};return{isLoggedAlready:n,getUsername:r,getToken:o,createCredentials:t,deleteCredentials:i}}e.$inject=["localStorageService"],app.factory("authService",e)}();
!function(){var e={APP_TITLE:"Spira Toolbox",APP_DESCRIPTION:"Great for learning Angular features.",APP_VERSION:"1.0",APP_NAVIGATION:[{state:"app",header:"Me",active:!1},{state:"app.projects",header:"Projects",active:!1},{state:"app.charts",header:"Charts",active:!1}],APP_AUTH_SUCCESS_TITLE:"Awesome.",APP_AUTH_SUCCESS_MESSAGE:"You were successfully authenticated.",APP_AUTH_ERROR_TITLE:"Oh no!.",APP_AUTH_ERROR_MESSAGE:"Please provide valid user information.",APP_PROJECT_MONTHS:["January","February","March","April","May","June","July","August","September","October","November","December"],APP_PROJECT_YEARS:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2025","2026"]};app.constant("constantsService",e)}();
!function(){function e(e,r,t,n){var c=function(r,t){var n=p(e.PROJECTS,r,t);return I(n)},u=function(){return n.get("username")},a=function(){return n.get("token")},o=function(){return n.get("projects")},i=function(r){var t=p(e.PROJECT,u(),a());return I(t.replace("{0}",r))},l=function(r){var t=p(e.PROJECT_RELEASES,u(),a());return I(t.replace("{0}",r))},s=function(r){var t=p(e.PROJECT_USERS,u(),a());return I(t.replace("{0}",r))},P=function(r,t){var n=p(e.PROJECT_INCIDENTS,u(),a());return I(n.replace("{0}",r).replace("{1}",t))},f=function(r){var t=p(e.PROJECT_INCIDENTS_TYPES,u(),a());return I(t.replace("{0}",r))},E=function(r){var t=p(e.PROJECT_INCIDENTS_COUNT,u(),a());return I(t.replace("{0}",r))},I=function(e){return r({method:"JSONP",url:t.trustAsResourceUrl(e),callbackKey:"callback"})},p=function(e,r,t){return e+"username="+r+"&api-key="+t};return{authUser:c,getAllProjects:o,getProjectById:i,getProjectReleasesById:l,getProjectUsersById:s,getProjectIncidentsById:P,getProjectIncidentsTypeById:f,getProjectIncidentsCountById:E}}e.$inject=["apiService","$http","$sce","localStorageService"],app.factory("dataService",e)}();
!function(){function r(){var r=function(r,t){toastr.success(t,r)},t=function(r,t){toastr.info(t,r)},o=function(r,t){toastr.error(t,r)};return{success:r,info:t,error:o}}app.factory("toastrService",r)}();



!function(){app.component("appheader",{templateUrl:"./views/commons/header.html",controllerAs:"mv",controller:["$scope","constantsService","localStorageService",app.controllers.header]})}();
!function(){app.component("bars",{templateUrl:"./views/projects/charts/chartBars.html",bindings:{data:"=",selector:"@",title:"@",labels:"=",series:"=",click:"="}})}();
(function(){
	function service(apiService, $http, $sce){
		/*Authenticate user*/
		var authUser = function(username, token){
			var url = makeURL(apiService.PROJECTS, username, token);
			return getData(url);
		};
		/*Get all projects*/
		var getAllProjects = function(){
			//console.log(apiService.PROJECTS);
			return [];
		};

		/*Utils*/
		var getData = function(url){
			return $http({
			  method: 'JSONP',
			  url: $sce.trustAsResourceUrl(url),
			  callbackKey: 'callback'
			});
		};
		var makeURL = function(url, username, token){
			return url+"?username=" + username + "&api-key=" + token;
		};

		return {
			authUser : authUser,
			getAllProjects : getAllProjects
		};
	};

	/*Inject apiService as a dependency! */
	service.$inject = ['apiService', '$http', '$sce'];

	/*Data Service*/
	app.factory("dataService", service);

}());
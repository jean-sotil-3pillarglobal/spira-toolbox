(function(){
	function service(apiService, $http){
		/*Authenticate user*/
		var authUser = function(username, token){
			var url = makeURL(apiService.PROJECTS, username, token);
			return getData(url, "GET");
		};
		/*Get all projects*/
		var getAllProjects = function(){
			//console.log(apiService.PROJECTS);
			return [];
		};

		/*Utils*/
		var getData = function(url, method){
			return $http({
			    url: url,
			    method: method,
			    dataType: 'jsonp',
			});
		};
		var makeURL = function(url, username, token){
			return url+"?username=" + username + "&api-key=" + token;
		};

		return {
			authUser : authUser,
			getAllProjects : getAllProjects
		}
	};

	/*Inject apiService as a dependency! */
	service.$inject = ['apiService', '$http'];

	/*Data Service*/
	app.factory("dataService", service);

}());
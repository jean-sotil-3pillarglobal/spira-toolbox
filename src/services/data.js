(function(){
	function service(apiService, 
					 $http, 
					 $sce, 
					 localStorageService){
		/*Authenticate user*/
		var authUser = function(username, token){
			var url = makeURL(apiService.PROJECTS, username, token);
			return getData(url);
		};

		/*Get user name from LocalStorageService*/
		var getUsername = function(){
			return localStorageService.get("username");
		};

		/*Get token name from LocalStorageService*/
		var getToken = function(){
			return localStorageService.get("token")
		};

		/*Get all projects*/
		var getAllProjects = function(){
			return localStorageService.get("projects");
		};

		/*Get project by id*/
		var getProjectById = function(id){
			var url = makeURL(apiService.PROJECT, getUsername(), getToken());
			return getData(url.replace('{0}', id));

		};

		/*Get project releases by id*/
		var getProjectReleasesById = function(id){
			var url = makeURL(apiService.PROJECT_RELEASES, getUsername(), getToken());
			return getData(url.replace('{0}', id));
		};

		/*Get project users by id*/
		var getProjectUsersById = function(id){
			var url = makeURL(apiService.PROJECT_USERS, getUsername(), getToken());
			return getData(url.replace('{0}', id));
		};

		/*Get project incidents by id*/
		var getProjectIncidentsById = function(id, count){
			var url = makeURL(apiService.PROJECT_INCIDENTS, getUsername(), getToken());
			return getData(url.replace('{0}', id).replace('{1}', count));
		};

		/*Get project incidents by id*/
		var getProjectIncidentsTypeById = function(id){
			var url = makeURL(apiService.PROJECT_INCIDENTS_TYPES, getUsername(), getToken());
			return getData(url.replace('{0}', id));
		};

		/*Get project incidents total count by id*/
		var getProjectIncidentsCountById = function(id){
			var url = makeURL(apiService.PROJECT_INCIDENTS_COUNT, getUsername(), getToken());
			return getData(url.replace('{0}', id));
		};

		/*Get project incidents total count by id*/
		var getProjectCustomPropertiesById = function(id){
			var url = makeURL(apiService.PROJECT_CUSTOM_TYPES, getUsername(), getToken());
			return getData(url.replace('{0}', id));
		};

		/*Get project incidents by CreationDate*/
		var getProjectIncidentsByCreationDate = function(id, count, creationDate){
			var url = makeURL(apiService.PROJECT_INCIDENTS_DATE, getUsername(), getToken());
			return getData(url.replace('{0}', id).replace('{1}', count).replace('{2}', creationDate));
		};

		/*Utils*/
		//
		/*Get data from URL*/
		var getData = function(url){
			return $http({
			  method: 'JSONP',
			  url: $sce.trustAsResourceUrl(url),
			  callbackKey: 'callback'
			});
		};

		/*Build URL with credentials*/
		var makeURL = function(url, username, token){
			return url+"username=" + username + "&api-key=" + token;
		};

		return {
			authUser : authUser,
			getAllProjects : getAllProjects,
			getProjectById : getProjectById,
			getProjectReleasesById : getProjectReleasesById,
			getProjectUsersById : getProjectUsersById,
			getProjectIncidentsById : getProjectIncidentsById,
			getProjectIncidentsTypeById : getProjectIncidentsTypeById,
			getProjectIncidentsCountById : getProjectIncidentsCountById,
			getProjectCustomPropertiesById : getProjectCustomPropertiesById,
			getProjectIncidentsByCreationDate : getProjectIncidentsByCreationDate
		};
	};

	/*Inject apiService as a dependency! */
	service.$inject = ['apiService', 
					   '$http', 
					   '$sce', 
					   'localStorageService'];

	/*Data Service*/
	app.factory("dataService", service);

}());
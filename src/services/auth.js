(function(){
	'use strict';

	function service(localStorageService){

		/*Set Credentials*/
		var createCredentials = function(username, token){
			localStorageService.set("username", username);
			localStorageService.set("token", token);
		};

		/*Check if user has a valid cache session*/
		var isLoggedAlready = function(){
			return (getUsername() !== undefined)? true:false;
		};

		/*Get Username*/
		var getUsername = function(){
			return localStorageService.get("username");
		};

		/*Get Token*/
		var getToken = function(){
			return localStorageService.get("token");
		};

		/*Delete stored data.*/
		var deleteCredentials = function(){
			localStorageService.remove("projects");
			localStorageService.remove("username");
			localStorageService.remove("token");
		};

		return {
			isLoggedAlready : isLoggedAlready,
			getUsername : getUsername,
			getToken : getToken,
			createCredentials : createCredentials,
			deleteCredentials : deleteCredentials
		};
	}

	service.$inject = ['localStorageService'];

	/*Auth Service*/
	app.factory("authService", service);
}());
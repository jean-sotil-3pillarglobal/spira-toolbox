(function(){

	function service(localStorageService){

		/*Set Credentials*/
		var createCredentials = $.proxy(function(username, token){
			localStorageService.set("username", username);
			localStorageService.set("token", token);
		}, this);

		/*Check if user has a valid cache session*/
		var isLoggedAlready = function(){
			return (getUsername() != undefined)? true:false;
		};

		/*Get Username*/
		var getUsername = $.proxy(function(){
			return localStorageService.get("username");
		}, this);

		/*Get Token*/
		var getToken = $.proxy(function(){
			return localStorageService.get("token");
		}, this);

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
		}
	};

	service.$inject = ['localStorageService'];

	/*Auth Service*/
	app.factory("authService", service);
}());
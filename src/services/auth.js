(function(){

	function service(){
		/*Create user credentials in cache*/
		var createCredentials = function(){
			return false;
		};
		/*Check if user has a valid cache session*/
		var isLoggedAlready = function(){
			return false;
		};

		return {
			createCredentials : createCredentials,
			isLoggedAlready : isLoggedAlready
		}
	};

	/*Auth Service*/
	app.factory("authService", service);
}());
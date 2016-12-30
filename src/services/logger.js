(function(){
	function service(){
		/*Success msg*/
		var success = function(title, msg){
			toastr["success"](msg, title);
		};
		/*Info msg*/
		var info = function(title, msg){
			toastr["info"](msg, title);
		};
		/*Error msg*/
		var error = function(title, msg){
			toastr["error"](msg, title);
		};
		
		return {
			success : success,
			info : info,
			error : error
		}
	};

	/*Logger Service*/
	app.factory("toastrService", service);
}());
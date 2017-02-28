(function(){
	'use strict';

	app.filter("trust", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  };
	}]);
}());
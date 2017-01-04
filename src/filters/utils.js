(function(){
	app.filter("byRelease", [function() {
	  return function(items, values){
	  	var filtered = [];
	  	var value = values[0];
	  	var type = values[1];

  		for (var i = 0; i < items.length; i++) {
  	      var item = items[i];
  	      switch(type) {
  	      	case 'DetectedReleaseId':
	  	      if (item[type] == value) {
	  	        filtered.push(item);
	  	      } 
  	      	break;
  	      }
  	    }
	  	return filtered;
	  }
	}]);
}());
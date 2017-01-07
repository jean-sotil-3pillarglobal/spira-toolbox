(function(){
	app.filter("filterFindBy", ['constantsService', function(constantsService) {
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
  	      	case 'DetectedReleaseByMonth':
  	      	  Date.prototype.monthNames = constantsService.APP_PROJECT_MONTHS;
  	      	  Date.prototype.getMonthName = function() {
  	      	      return this.monthNames[this.getMonth()];
  	      	  };

  	      	  var monthDate = new Date(moment(item.CreationDate)).getMonthName();
  	      	  if (monthDate == value) {
  	      	    filtered.push(item);
  	      	  } 
  	      	break;
            case 'DetectedReleaseByYear':
              var yearDate = moment(new Date(moment(item.CreationDate))).year();
              if (yearDate == value) {
                filtered.push(item);
              } 
            break;
            case 'DetectedReleaseValues':
              if (item.ReleaseId == value) {
                filtered.push(item.VersionNumber.substring(0, 6) + "-" + item.ReleaseId);
              } 
            break;

  	      }
  	    }
	  	return filtered;
	  }
	}]);
}());
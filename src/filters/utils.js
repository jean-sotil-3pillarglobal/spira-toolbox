(function(){
	app.filter("filterFindBy", ['constantsService', function(constantsService) {
	  return function(items, values){
	  	var filtered = [];
	  	var value = values[0];
	  	var type = values[1];

  		for (var i = 0; i < items.length; i++) {
  	      var item = items[i];
  	      switch(type) {
  	      	case 'filterByReleaseId':
	  	      if (item.DetectedReleaseId == value) {
	  	        filtered.push(item);
	  	      } 
  	      	break;
  	      	case 'filterByMonth':
  	      	  Date.prototype.monthNames = constantsService.APP_PROJECT_MONTHS;
  	      	  Date.prototype.getMonthName = function() {
  	      	      return this.monthNames[this.getMonth()];
  	      	  };

  	      	  var monthDate = new Date(moment(item.CreationDate)).getMonthName();
  	      	  if (monthDate == value) {
  	      	    filtered.push(item);
  	      	  } 
  	      	break;
            case 'filterByYear':
              var yearDate = moment(new Date(moment(item.CreationDate))).year();
              if (yearDate == value) {
                filtered.push(item);
              } 
            break;
            case 'filterByReleaseValue':
              if (item.ReleaseId == value) {
                filtered.push(item.Name);
              } 
            break;
            case 'filterActiveRelease':
              if (item.Active == value) {
                filtered.push(item);
              } 
            break;
            case 'filterReleaseExist':
              value.map(function(release){
                 if(item == release.ReleaseId) filtered.push(item);
              });
            break;
            case 'filterByReleaseVersionNumber': /*For incidents*/
              if (item.DetectedReleaseVersionNumber == value) {
                filtered.push(item);
              } 
            break;
            case 'filterReleaseVersionNumber': /*For releases*/
              value.map(function(versionNumber){
                 if(item.VersionNumber == versionNumber) filtered.push(item);
              });
            break;
            case 'filterReleaseByReleaseId': /*For releases*/
              if (item.ReleaseId == value) {
                  filtered = item;
              } 
            break;
            case 'filterByIncidentTypeName': /*For releases*/
              if (item.IncidentTypeName == value) {
                  filtered.push(item);
              } 
            break;
            case 'filterByIncidentStatusName': /*For releases*/
              if (item.IncidentStatusName == value) {
                  filtered.push(item);
              } 
            break;
            case 'filterByIncidentOpenerName': /*For releases*/
              if (item.OpenerName == value) {
                  filtered.push(item);
              } 
            break;

  	      }
  	    }
	  	return filtered;
	  }
	}]);
}());
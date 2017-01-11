(function(){
	function service($filter,
					 constantsService){
		
		/*Utils*/
		var bindArrayWithQuantity = function(array1, array2, type){
		    var container = [];
		    $(array1).each(function(i, value){
		        var filter = [value, type];
		        var filtered = $filter('filterFindBy')(array2, filter);
		        container.push(filtered.length);
		    });
		    return container;
		};
		var bindArrayWithValue = function(array1, array2, type){
		    var container = [];
		    $(array1).each(function(i, value){
		        var filter = [value, type];
		        var filtered = $filter('filterFindBy')(array2, filter);
		        container.push(filtered);
		    });
		    return container;
		};
		/*get labels*/
		var getLabelsArray = function(array, index, type){
		    var container = [];
		    $(array).each(function(i, value){
		        switch(type){
		            case 'default':
		                if(container.indexOf(value[index]) == -1 && value[index]) container.push(value[index]);
		            break;
		            case 'year':
		                var year = moment(value[index]).year();
		                if(container.indexOf(year) == -1 && year) container.push(year);
		            break;
		        }
		    });
		    return container;
		};
		var validateDataArray = function(array){
		    var empty = false;

		    if(array.length == 0) return empty;
		    array.map(function(item){
		        if(item != 0) empty = true;
		    });
		    return empty;
		};
		/*Get Chart.js Object*/
		var setChartObject = function(id, type, labels, data, options, label, bgColor, borderColor, typeChart){
		    var chart = document.getElementById(id);
		    var	body={};
		        body.options={};
		    switch(type){
		    	case 'bar':
		    		dataset = {
		                label: label,
		                data: data,
		                backgroundColor: getColorsArray(bgColor, labels, typeChart),
		                borderColor: getColorsArray(borderColor, labels, 'border'),
		                borderWidth: 1
		            };
				    /*Chart extra options.*/
				    body.options = options;
				    body.options.events = false;
				    body.options.tooltips = {enabled:true};
				    //body.options.hover = {animationDuration: 0};
				    body.options.animation = {
				    	duration: 1,
		    	        onComplete: function () {
		    	            var chartInstance = this.chart,
		    	                ctx = chartInstance.ctx;
			    	            ctx.font = Chart.helpers.fontString(8, 'bold', Chart.defaults.global.defaultFontFamily);
			    	            ctx.textAlign = 'center';
			    	            ctx.textBaseline = 'bottom';

			    	            this.data.datasets.forEach(function (dataset, i) {
			    	                var meta = chartInstance.controller.getDatasetMeta(i);
			    	                meta.data.forEach(function (bar, index) {
			    	                    var data = dataset.data[index];    
			    	                    ctx.fillStyle = 'black';                        
			    	                    ctx.fillText(data, bar._model.x, bar._model.y - 2);
			    	                });
			    	            });
		    	        }
				    }
		    	break;
		    	case 'pie':
		    		dataset = {
		                label: label,
		                data: data,
		                backgroundColor: getColorsArray(bgColor, labels, typeChart),
		                borderColor: getColorsArray(borderColor, labels, 'border'),
		                borderWidth: 1
		            };
		            body.options = options;
		    	break;
		    };

		    /*chart body*/
		    body.type = type;
		    body.data = {
		    	labels: labels,
		    	datasets: [dataset]
		    };

		    chart = new Chart(chart, body);
		}

		var getColorsArray = function(color, arr, type){
		    return (arr.map(function(item){
		    	if(type == 'border') return color;
		    	
		    	switch(item){
		    		case 'Closed':
		    			return constantsService.CHART_COLORS[2];
		    		break;
		    		case 'New':
		    			return constantsService.CHART_COLORS[3];
		    		break;
		    		case 'Open':
		    			return constantsService.CHART_COLORS[4];
		    		break;
		    		case 'Retest Dev':
		    			return constantsService.CHART_COLORS[5];
		    		break;
		    		case 'Rejected':
		    			return constantsService.CHART_COLORS[6];
		    		break;
		    		case '1 - High':
		    			return constantsService.CHART_COLORS[12];
		    		break;
		    		case '2 - Major':
		    			return constantsService.CHART_COLORS[9];
		    		break;
		    		case '3 - Medium':
		    			return constantsService.CHART_COLORS[10];
		    		break;
		    		case '4 - Low':
		    			return constantsService.CHART_COLORS[11];
		    		break;
		    		case '5 – Task/Enhancement':
		    			return constantsService.CHART_COLORS[8];
		    		break;
		    		case '6 - Deferred':
		    			return constantsService.CHART_COLORS[7];
		    		break;
		    		case '7':
		    			return constantsService.CHART_COLORS[6];
		    		break;
		    		case '8':
		    			return constantsService.CHART_COLORS[6];
		    		break;
		    		default:
		    			return color;

		    	};
		    })); 
		};

		return {
			bindArrayWithQuantity : bindArrayWithQuantity,
			bindArrayWithValue : bindArrayWithValue,
			getLabelsArray : getLabelsArray,
			validateDataArray : validateDataArray,
			setChartObject : setChartObject,
			getColorsArray : getColorsArray
		};
	};

	/*Inject helperService as a dependency! */
	service.$inject = ['$filter', 
					   'constantsService'];

	/*Helper Service*/
	app.factory("helperService", service);

}());
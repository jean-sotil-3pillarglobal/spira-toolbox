(function(){
	'use strict';
	
	var contants =  {
		/*Global Values*/
		APP_TITLE : "Spira Toolbox",
		APP_DESCRIPTION : "Great for learning Angular features.",
		APP_VERSION : "1.0",
		APP_NAVIGATION : [
			{state:'app', header:'Me', active: false},
			{state:'app.projects', header:'Projects', active: false},
			{state:'app.reviewer', header:'Reviewer', active: false}
		],
		/*Auth Ctrl*/
		APP_AUTH_SUCCESS_TITLE : "Awesome.",
		APP_AUTH_SUCCESS_MESSAGE : "You were successfully authenticated.",
		APP_AUTH_ERROR_TITLE : "Oh no!.",
		APP_AUTH_ERROR_MESSAGE : "Please provide valid user information.",

		/*Projects Dates*/
		APP_PROJECT_MONTHS : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
		APP_PROJECT_YEARS : ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2025", "2026" ],

		/*Charts*/
		CHART_TITLES:['Total Incidents Filtered By Year', 				//0
					  'Total Incidents Filtered By Release', 			//1
					  'Total Incidents Filtered By Type', 				//2
					  'Total Incidents Filtered By Status', 			//3
					  'Total Incidents Filtered By Opener', 			//4
					  'Total Incidents Filtered By Priority', 			//5
					  'Total Incidents Filtered By Projects', 			//6
					  'Total Incidents Filtered By Owner', 				//7
					  'Total Incidents Filtered By DEV Owner', 			//8
					  'Total Incidents Filtered By Channel/Devices', 	//9
					  'Total Progress %', 								//10
					  ],
		CHART_COLORS:['rgb(255,255,244)', 		//Default bar color
					  'rgb(7,54,66)', 			//Default bar color
					  'rgb(244,243,86)', 		//Closed[2]
					  'rgb(248,248,248)', 		//New[3]
					  'rgb(252,248,227)', 		//Open[4]
					  'rgb(245,216,87)', 		//Retest Dev[5]
					  'rgb(242,158,86)', 		//Rejected[6]
					  'rgb(102,255,255)', 		//Deferred[7]
					  'rgb(255,255,204)', 		//Task/Enhancement[8]
					  'rgb(242,158,86)', 		//Major[8]
					  'rgb(245,216,87)', 		//Medium[9]
					  'rgb(244,243,86)', 		//Low[10]
					  'rgb(244,116,87)', 		//High[11]
					  'rgb(228,255,0)', 		//Retest QA[12]

					  //Channels
					  'rgb(244,216,90)', 		//All[13]
					  'rgb(255,234,145)', 		//Desktop[14]
					  'rgb(239,230,189)', 		//Desktop/Mobile[15]
					  'rgb(108,226,199)', 		//Desktop/Tablet[16]
					  'rgb(96,255,215)', 		//Mobile[17]
					  'rgb(244,207,39)', 		//Tablet[18]
					  'rgb(74,226,158)', 		//Tablet/Mobile[19]
					  ]
	};

	/*Contants Service*/
	app.constant("constantsService", contants);
}());
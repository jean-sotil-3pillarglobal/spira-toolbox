(function(){

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
		CHART_TITLES:['Total Incidents Reported By Year',
					  'Total Incidents Reported By Release',
					  'Total Release Incidents Reported By Type',
					  'Total Release Incidents Reported By Status',
					  'Total Release Incidents Reported By Opener',
					  'Total Release Incidents Reported By Priority'],
		CHART_COLORS:['rgb(146,146,146)', //Default bar color
					  'rgb(7,54,66)', //Default bar color
					  'rgb(244,243,86)', //Closed[2]
					  'rgb(248,248,248)', //New[3]
					  'rgb(252,248,227)', //Open[4]
					  'rgb(245,216,87)', //Retest Dev[5]
					  'rgb(242,158,86)', //Rejected[6]
					  'rgb(102,255,255)', //Deferred[7]
					  'rgb(255,255,204)', //Task/Enhancement[8]
					  'rgb(242,158,86)', //Major[8]
					  'rgb(245,216,87)', //Medium[9]
					  'rgb(244,243,86)', //Low[10]
					  'rgb(244,116,87)', //High[11]
					  'rgb(228,255,0)', //Retest QA[12]
					  ]
	};

	/*Contants Service*/
	app.constant("constantsService", contants);
}());
(function(){

	var contants =  {
		PROJECTS : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects?",
		PROJECT : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}?",
		PROJECT_RELEASES : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/releases?",
		PROJECT_USERS : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/users?",
		PROJECT_INCIDENTS : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/search?start_row=0&number_rows={1}&",
		PROJECT_INCIDENTS_TYPES : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/types?",
		PROJECT_INCIDENTS_DATE : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/recent?start_row=0&number_rows={1}&creation_date={2}&",
		PROJECT_INCIDENTS_COUNT : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/count?",
		PROJECT_CUSTOM_TYPES : "https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/custom-properties?"
	};

	app.constant("apiService", contants);
}());
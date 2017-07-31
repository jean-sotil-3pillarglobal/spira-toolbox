(function() {
    'use strict';

    if (!app.controllers) {
        app.controllers = {};
    }

    /*AuthCtrl Function*/
    app.controllers.taskstable = function(constantsService, helperService) {
        var mv = this;

        mv.makeCalc = function(data) {

            /*Total Progress*/
            data.totalProgress = ((data.totalActualEffort / data.totalEstimatedEffort) * 100);
            data.doughnut.data = [data.totalProgress, 100 - data.totalProgress];
            data.doughnut.labels = ["Complete", "Missing"];

            /*Create PIE chart*/
            setTimeout(function() {
                var obj = {
                    description: '',
                    attr: '',
                    type: 'bar',
                    filter: '',
                    title: 10,
                    label: true,
                    fontSize: 10,
                    xAxesFontsize: 10,
                    chartType: 'bar',
                    defaultColor1: 0,
                    defaultColor2: 1,
                    anim: ''
                };


                data.doughnut.options = helperService.getOpsChartObject(obj.title,
                    obj.label,
                    obj.fontSize,
                    obj.xAxesFontsize);

                data.doughnut.chart = helperService.setChartObject(data.doughnut.id,
                    obj.chartType,
                    data.doughnut.labels,
                    data.doughnut.data,
                    data.doughnut.options,
                    obj.description,
                    constantsService.CHART_COLORS[obj.defaultColor1],
                    constantsService.CHART_COLORS[obj.defaultColor2],
                    obj.anim);

                data.doughnut.display = true;
                setTimeout(function(){
                    data.doughnut.data = [data.totalProgress, 100 - data.totalProgress];
                }, 1000);
            }, 1000);
        };
    };

    /*AuthCtrl Def*/
    app.controllers.taskstable.$inject = ['constantsService', 'helperService'];
}());

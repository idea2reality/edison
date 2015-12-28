namespace i2r.googleChart {
    class GoogleChartDirective implements ng.IDirective {

        static instance(googleChartService, edisonService, $routeParams, $q): ng.IDirective {
            return new GoogleChartDirective(googleChartService, edisonService, $routeParams, $q);
        }
        constructor(
            private googleChartService: GoogleChartService,
            private eidsonService: i2r.common.EdisonService,
            private $routeParams,
            private $q: ng.IQService
            ) { }

        private innerWidth: number;

        restrict = 'E';
        replace = true;
        templateUrl = 'templates/googleChart.tpl.html';
        scope = {}
        link = ($scope, elem: ng.IAugmentedJQuery, attrs) => {

            if (this.innerWidth == undefined)
                this.innerWidth = elem.parent().innerWidth();

            var edisonId = this.$routeParams.edisonId;

            this.$q.all({
                'edison': this.eidsonService.get(edisonId),
                'googleChartOnLoad': this.googleChartService.onLoad()
            }).then((promises) => {
                var edison: common.Edison = promises['edison'];

                $scope.edison = edison;
                $scope.$watch('edison.isAlive', (nv, ov) => {
                    if (nv != true) return;

                    edison.onLog((log) => {
                        if (data.getNumberOfRows() > 15) {
                            data.removeRow(0);
                        }
                        // Generating a random x, y pair and inserting it so rows are sorted.
                        var x = moment(log.date);
                        var y = Number(log.value.toFixed(2));
                        var where = 0;
                        /*while (where < data.getNumberOfRows() && parseInt(data.getValue(where, 0)) < x) {
                            where++;
                        }*/
                        data.insertRows(data.getNumberOfRows(), [[x.format('ss초'), y]]);
                        drawChart();
                    });
                }, false)

                var options: google.visualization.LineChartOptions = {
                    width: this.innerWidth,
                    height: window.innerHeight,
                    vAxis: { minValue: 0, maxValue: 30 },
                    animation: {
                        duration: 300,
                        easing: 'in'
                    },
                    legend: {
                        position: 'none'
                    },
                    chartArea: {
                        width: '100%',
                      //  top: 50,
                        left: 50
                    }
                };

                var chart = new google.visualization.LineChart(elem.get(0));
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'x');
                data.addColumn('number', '온도');

                /*var button = document.getElementById('b1');*/
                function drawChart() {
                    // Disabling the button while the chart is drawing.
                    /*button.disabled = true;*/
                    google.visualization.events.addListener(chart, 'ready',
                        function() {
                            /*button.disabled = false;*/
                        });
                    chart.draw(data, options);
                }

                edison.getLatestLogs().forEach((log) => {
                    var x = moment(log.date);
                    var y = Number(log.value.toFixed(2));
                    data.insertRows(data.getNumberOfRows(), [[x.format('ss초'), y]]);
                })

                drawChart();
            });
        }
    }

    angular.module('googleChart.directive', [])
        .directive('i2rGoogleChart', GoogleChartDirective.instance);
}

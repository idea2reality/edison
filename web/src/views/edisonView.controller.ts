module views {
    class EdisonViewController {

        private edison: common.Edison;
        private log: any;

        constructor(
            private $scope,
            private edisonService: common.EdisonService,
            private $mdBottomSheet,
            private $log,
            private $routeParams
            ) {
            this.edisonService.get($routeParams.edisonId)
                .then(edison => this.setEdison(edison));

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            /*function drawChart() {

                // Create the data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                data.addRows([
                    ['Mushrooms', 3],
                    ['Onions', 1],
                    ['Olives', 1],
                    ['Zucchini', 1],
                    ['Pepperoni', 2]
                ]);

                // Set chart options
                var options = {
                    'title': 'How Much Pizza I Ate Last Night',
                    'width': 400,
                    'height': 300
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }

            drawChart();*/
        }

        private setEdison(edison) {
            this.edison = edison;
            /*this.edison.onLog((log) => {
                this.log = log;
                this.log._id = new Date(this.log._id).toLocaleString();
                this.log.value = this.log.value.toFixed(2);

                this.$scope.$apply()
            });*/
        }

        share($event) {
            var user = this.edison;

            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: '/templates/contactSheet.tpl.html',
                controller: ['$mdBottomSheet', UserSheetController],
                controllerAs: "vm",
                bindToController: true,
                targetEvent: $event
            }).then((clickedItem) => {
                this.$log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function UserSheetController($mdBottomSheet) {
                this.user = user;
                this.items = [
                    { name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg' },
                    { name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg' },
                    { name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg' },
                    { name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg' }
                ];
                this.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }
    }

    angular.module('views.edison', [])
        .controller('EdisonViewController', EdisonViewController);
}

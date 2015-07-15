module googleChart {

    export class GoogleChartService {

        private loadPromise: ng.IPromise<any>;

        constructor(
            private $rootScope: ng.IRootScopeService,
            private $q: ng.IQService
            ) {
            this.loadPromise = this.load();
        }

        onLoad(): ng.IPromise<any> {
            return this.loadPromise;
        }

        private load(): ng.IPromise<any> {
            var deferred = this.$q.defer();

            $.getScript('https://www.google.com/jsapi')
                .done(() => {
                    // Load the Visualization API and the piechart package.
                    google.load('visualization', '1.0', { 'packages': ['corechart'], 'callback': deferred.resolve });
                    // Set a callback to run when the Google Visualization API is loaded.
                    /*google.setOnLoadCallback(deferred.resolve);*/
                })
                .fail(() => deferred.reject(new Error('Cannot load Google Loader')));

            return deferred.promise;
        }
    }

    angular.module('googleChart.service', [])
        .service('googleChartService', GoogleChartService);
}

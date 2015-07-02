/// <reference path="../common"/>

module common {

    export class UserService {

        private userCache = null;
        private isFetching = false;
        private fetchingPromise = null;

        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService
            ) { }

        loadAllUsers(): ng.IPromise<any[]> {
            if (this.userCache == null)
                return this.fetch();
            return this.$q.when(this.userCache);
        }

        private fetch() {
            if (this.isFetching)
                return this.fetchingPromise

            this.isFetching = true;
            this.fetchingPromise = this.$http.get('/users')
                .then((res) => {
                    this.isFetching = false;
                    return res.data;
                })
                .then((users) => this.userCache = users);

            return this.fetchingPromise;
        }
    }

    angular.module('common.services.user', [])
        .service('userService', UserService);
}

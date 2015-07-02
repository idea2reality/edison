/// <reference path="../common"/>

module common {

    export class UserService {

        private userCache = null;

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
            return this.$http.get('/users')
                .then((res) => { return res.data; })
                .then((users) => this.userCache = users);
        }
    }

    angular.module('common.services.user', [])
        .service('userService', UserService);
}

(function () {
    'use strict';

    angular.module('C3web.services')
    .factory('LoginService', ['JsonService', function (jsonService) {

        var auth = function (user) {
            return jsonService.post('auth', user);
        };
        var list = function () {
            return jsonService.get('user');
        };
        return {
            auth: auth,
            list:list
        };
    }]);
})();
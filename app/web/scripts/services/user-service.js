/**
 * Created by alexander on 3/30/16.
 */
(function (angular, undefined) {
    'use strict';

    var userService = function (jsonService) {

        var user = function (userUID) {
            return jsonService.get('user/' + userUID);
        };
        var list = function () {
            return jsonService.get('user');
        };
        return {
            user: user,
            list: list
        };
    };

    userService.$inject = ['JsonService'];

    angular.module('C3web.services').factory('UserService', userService);
})(angular);

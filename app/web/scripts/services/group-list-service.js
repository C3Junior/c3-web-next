(function(angular, undefined) {
    'use strict';

    var service = function(jsonService) {

        var list = function() {
            return jsonService.get('groups');
        };

        var get = function(groupID) {
            return jsonService.get('group/' + groupID);
        };

        return {
            list: list,
            get: get
        };
    };

    service.$inject = ['JsonService'];


    angular.module('C3web.services').factory('GroupListService', service);
})(angular);

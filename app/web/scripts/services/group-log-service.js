/**
 * Created by alexander on 3/30/16.
 */
(function(angular, undefined) {
    'use strict';

    var service = function(jsonService) {

        var listAll = function() {
            return jsonService.get('journal');
        };

        var get = function(messageID) {
            return jsonService.get('journal/' + messageID);
        };

        return {
            list: listAll,
            get: get
        };
    };

    service.$inject = ['JsonService'];


    angular.module('C3web.services').factory('GroupLogService', service);
})(angular);

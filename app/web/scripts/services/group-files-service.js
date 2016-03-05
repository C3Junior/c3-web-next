(function(angular, undefined) {
    'use strict';

    var service = function(jsonService) {

        var get = function(groupID, fileRelativeUrl) {
            return jsonService.get('files/%2F' + groupID + '%2F' + fileRelativeUrl);
        };

        var list = function(path) {
            return jsonService.get('files/' + path);
        };

        var create = function(folder) {
            return jsonService.post("create/", folder);
        };

        return {
            list: list,
            get: get,
            create: create
        };
    };

    service.$inject = ['JsonService'];

    angular.module('C3web.services').factory('GroupFilesService', service);
})(angular);

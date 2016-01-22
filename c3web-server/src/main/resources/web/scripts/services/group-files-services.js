(function () {
    'use strict';

    angular.module('C3web.services')
    .factory('GroupFilesService', ['JsonService', function (jsonService) {

        var files = function (groupID,files) {
            return jsonService.get('group/' + groupID + '/files/'+files);
        };

        var get = function (groupID) {
            return jsonService.get('group/' + groupID);
        };
        var create = function (url, file) {
            return jsonService.post(url, file, null, null, null)
        }


        return {
            list: list,
            get: get,
            create: create
        };
    }]);
})();
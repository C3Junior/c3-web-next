(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupLogController', ['$scope', 'GroupLogService', 'UserService', function($scope, GroupLogService, UserService) {
            $scope.model = {
                messages: []
            };

            GroupLogService.list().then(function(result) {
                //$scope.model.messages = result.data;
                $scope.model.messages = _.map(result.data, function(message, index) {
                    return {
                        uid: message.id,
                        groupId: message.groupId,
                        content: message.content
                    };
                });
            });
        }]);
})(angular);

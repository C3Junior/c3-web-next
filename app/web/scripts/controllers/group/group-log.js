(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupLogController', ['$scope', '$stateParams', 'GroupLogService', function($scope, $stateParams, GroupLogService) {
            $scope.model = {
                messages: []
            };
            $scope.viewModel = {
                showChooseHardware: false
            };
            $scope.model.CurrentDate = new Date();
            var idGroup = $stateParams.id;
            GroupLogService.get(idGroup).then(function(result) {
                $scope.model.messages = _.map(result.data, function(message, index) {
                    return {
                        uid: message.id,
                        groupId: message.groupId,
                        content: message.content,
                        authorName: message.authorName,
                        time: Date.parse(message.time),
                        messagetype: message.messageType,
                        attachedResources: message.attachedResources
                    };
                });
            });

            $scope.model.showComment = false;
            $scope.addMessage = function() {
                console.log('Adding new message');
                $scope.model.showComment = true;
            };
        }]);
})(angular);

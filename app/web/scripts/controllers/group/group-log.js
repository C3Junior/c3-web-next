(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupLogController', ['$scope', '$stateParams', '$http', 'GroupLogService',
            function($scope, $stateParams, $http, GroupLogService) {
                $scope.model = {
                    messages: [],
                    newMessage: '',
                    newChildMessage: '',
                    showComment: false,
                    currentDate: new Date()
                };
                $scope.viewModel = {
                    showChooseHardware: false
                };

                var groupId = $stateParams.id;

                var load = function() {
                    GroupLogService.get(groupId).then(function(result) {
                        $scope.model.messages = _.map(result.data, function(message, index) {
                            return {
                                uid: message.id,
                                groupId: message.groupId,
                                content: message.content,
                                author: message.authorName,
                                time: Date.parse(message.time),
                                type: message.messageType,
                                attachedResources: message.attachedResources,
                                collapsed: true
                            };
                        });
                    });
                };

                $scope.addMessage = function() {
                    console.log('Adding new message');
                    $scope.model.showComment = true;
                    $http({
                        url: 'api/journal',
                        method: 'POST',
                        data: {
                            authorId: '1',
                            groupId: groupId,
                            content: $scope.model.newMessage,
                            attachedResources: []
                        }
                    }).then(function() {
                        load();
                    });

                    $scope.model.newMessage = '';
                };

                load();
            }
        ]);
})(angular);

(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupController', ['$scope', '$stateParams', 'GroupListService',
            function($scope, $stateParams, GroupListService) {
                $scope.group = {};
                var idGroup = $stateParams.id;

                var load = function() {
                    GroupListService.get(idGroup).then(function(result) {
                        $scope.group = result.data;
                    });
                };

                $scope.tabs = [{
                    title: 'Journal',
                    state: 'group.journal'
                }, {
                    title: 'Files',
                    state: 'group.files'
                }, {
                    title: 'Settings',
                    state: 'group.settings'
                }];

                load();
            }
        ]);
})(angular);

(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupListController', ['$scope', 'GroupListService', function($scope, GroupListService) {
            $scope.model = {
                filter: '',
                groups: []
            };

            GroupListService.list().then(function(result) {
                $scope.model.groups = result.data;
            });
        }]);
})(angular);

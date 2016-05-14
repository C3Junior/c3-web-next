(function(angular, undefined) {
    'use strict';

    angular.module('C3web.controllers')
        .controller('group.groupListController', Controller);

    Controller.$inject = ['$scope', 'GroupListService', 'normalizationService'];

    function Controller($scope, GroupListService, normalizationService) {
        var normalize = normalizationService('weight', 'normalizedWeight');

        $scope.model = {
            filter: '',
            groups: []
        };

        var mockAnnotation = function() {
            return _.range(1, 10).map(function(index) {
                return {
                    tag: 'Keyword ' + index,
                    weight: index
                };
            });
        };

        GroupListService.list().then(function(result) {
            $scope.model.groups = result.data;

            $scope.model.groups.forEach(function(group) {
                group.annotation = mockAnnotation();
                group.annotation = normalize(group.annotation);
            });
        });
    }
})(angular);

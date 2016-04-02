(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupController', ['$scope', '$stateParams', 'GroupListService',
            function($scope, $stateParams, GroupListService) {
                $scope.group = {};
                var idGroup = $stateParams.id;

                $scope.load = function() {
                    GroupListService.get(idGroup).then(function(result) {
                        $scope.group = result.data;
                        $scope.selectedPage = $scope.pages[0];
                    });
                };
                $scope.titles = [{
                    title: 'Grp'
                }, {
                    title: 'Role_Profile_Edit_title'
                }];

                $scope.pages = [{
                    title: 'Journal',
                    view: 'views/group/group-log.html',
                    index: 0,
                    active: true
                }, {
                    title: 'Files',
                    view: 'views/group/group-files.html',
                    index: 1,
                    active: false
                }, {
                    title: 'Settings',
                    view: 'views/group/group-settings.html',
                    index: 2,
                    active: false
                }];
                $scope.load();

                $scope.selectPage = function(index) {
                    angular.forEach($scope.pages, function(value) {
                        value.active = false;
                    });

                    $scope.pages[index].active = true;
                    $scope.selectedPage = $scope.pages[index];
                };
            }
        ]);
})(angular);

(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('group.groupFilesController', ['_', '$scope', '$stateParams', '$window', 'GroupFilesService',
            function(_, $scope, $stateParams, $window, FilesService) {
                /*$scope.elements=[{uid:'1', type:'dir',name:'TcpConnection terminated, stopping', size:'300 MB', owner:'Delar', ctime:'Tue, 17 Jun 2014 13:04:55 GMT'},
                 {uid:'2', type:'img', size:'10 MB',name:'TcpConnection terminated',  owner:'Delar', ctime:'Tue, 17 Jun 2014 13:04:55 GMT'},
                 {uid:'3', type:'txt', size:'1.2 MB',name:'TcpConnection terminated',  owner:'Delar', ctime:'Tue, 17 Jun 2014 13:04:55 GMT'}];*/

                $scope.model = {
                    elements: [],
                    element: null,
                    query: '',
                    rootFolder: '/' + $stateParams.id,
                    currentPath: '/' + $stateParams.id
                };

                var load = function() {
                    FilesService.list(encodeURIComponent($scope.model.currentPath)).then(function(result) {
                        $scope.model.elements = _.map(result.data, function(file, index) {
                            var metadata = file.metadata || {};

                            return {
                                uid: index + 1,
                                type: file.contentType,
                                size: metadata.size,
                                name: metadata.title,
                                url: file.url,
                                isFolder: file.isFolder,
                                owner: metadata.owner,
                                ctime: metadata.creationTime
                            };
                        });
                    });
                };

                $scope.showDetails = function(element) {
                    $scope.model.element = element;
                    $scope.model.currentPath = $scope.model.element.url;

                    if ($scope.model.element.isFolder) {
                        load();
                    }
                };


                $scope.hideDetails = function() {
                    $scope.model.element = null;
                };

                $scope.goBack = function() {
                    if ($scope.model.currentPath != $scope.model.rootFolder) {
                        $scope.model.currentPath = $scope.model.currentPath.split('/').slice(0, -1).join('/');
                        $scope.model.element = null;
                        load();
                    }
                };

                $scope.download = function(url) {
                    var fileUrl = '/api/download/' + encodeURIComponent(url);
                    $window.open(fileUrl);
                };

                load();
            }
        ]);
})(angular);

(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('createFolderController', ['$scope', '$http', '$routeParams', 'GroupFilesService', '$sce',
            function($scope, $http, $routeParams, FilesService, $sce) {
                var currentPath = $sce.trustAsResourceUrl($routeParams.path);

                $scope.createFolder = function(folder) {
                    var formData = new FormData();
                    var folderParams = {
                        url: "/" + currentPath + "/" + folder.name,
                        file: "",
                        fileName: folder.name,
                        fileSize: "0",
                        fileType: "folder",
                        fileTags: folder.tags,
                        contentType: "folder",
                        isFolder: true
                    };

                    $http({
                        method: 'POST',
                        url: '/api/file',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: folderParams
                    }).success(function() {
                        history.back();
                    });

                    /* $.ajax({
                         url: '/api/file',
                         type: "POST",
                         data: folderParams,
                         contentType: "application/x-www-form-urlencoded",
                         dataType: "json",
                         processData: false,
                         success: function() {
                             history.back();
                         }
                     });*/

                    /*$http.post('/api/file', folderParams).then(function(result) {
                        history.back();
                    });*/

                    /*FilesService.create(folderParams).then(function(results) {
                        if (results.status == "200") {
                            history.back();
                        }
                    });*/
                };
            }
        ]);


})(angular);

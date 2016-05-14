(function(angular) {
    'use strict';
    angular.module('C3web.controllers')
        .controller('fileUploadController', ['$scope', '$stateParams', '$http', 'FileUploader', '$sce',
            function($scope, $stateParams, $http, FileUploader, $sce) {
                var uploader = $scope.uploader = new FileUploader({
                    url: '/api/file'
                });
                var currentPath = ($stateParams.path);
                // FILTERS

                uploader.filters.push({
                    name: 'customFilter',
                    fn: function(item /*{File|FileLikeObject}*/ , options) {
                        return this.queue.length < 10;
                    }
                });

                function loadDictionary() {
                    if (!dictData.length) {
                        $http({
                            url: '/api/file/' + encodeURIComponent("StopWordsEn.sw"),
                            method: 'GET'
                        }).then(function(result) {
                            stopWordEng = bytesToString(result.data.content).split(';');
                            $http({
                                url: '/api/file/' + encodeURIComponent("StopWordsRu.sw"),
                                method: 'GET'
                            }).then(function(result) {
                                stopWordRu = bytesToString16(result.data.content).split(';');
                                $http({
                                    url: '/api/file/' + encodeURIComponent("ComputerScience.cv"),
                                    method: 'GET'
                                }).then(function(result) {
                                    dictData = bytesToString(result.data.content).split('\n');
                                    parseDictionaryToArr(dictData);
                                });
                            });
                        });
                    }
                }

                loadDictionary();

                function bytesToString(bytes) {
                    var bufView = new Uint8Array(bytes);
                    return String.fromCharCode.apply(null, bufView);
                }

                function bytesToString16(bytes) {
                    var bufView = new Uint16Array(bytes);
                    return String.fromCharCode.apply(null, bufView);
                }


                function annotateFile(fileBytes) {
                    var res = {};
                    return parseTextData(bytesToString(fileBytes), res, "dict").sort(function(a, b) {
                        return a.frequency - b.frequency;
                    }).slice(0, 20);
                }


                // CALLBACKS

                uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
                    console.info('onWhenAddingFileFailed', item, filter, options);
                };
                uploader.onAfterAddingFile = function(fileItem) {
                    var fr = new FileReader();
                    fileItem.annotation = [];
                    fr.readAsArrayBuffer(fileItem._file);
                    fr.onload = function() {
                        var data = fr.result;
                        fileItem.annotation = annotateFile(data);
                        $scope.$apply();
                    };
                    //}

                    console.info('onAfterAddingFile', fileItem);
                };
                uploader.onAfterAddingAll = function(addedFileItems) {
                    console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function(item) {
                    console.info('onBeforeUploadItem', item);
                    item.formData.push({
                        url: currentPath + "/" + item.file.name
                    });
                    item.formData.push({
                        fileName: item.file.name
                    });
                    item.formData.push({
                        fileSize: item.file.size
                    });
                    item.formData.push({
                        fileTags: JSON.stringify(
                            item.annotation.map(function(i) {
                                return {
                                    text: i.word,
                                    weight: i.frequency,
                                    isUserDefined: false
                                };
                            }))
                    });
                    item.formData.push({
                        fileType: 'Other'
                    });
                    item.formData.push({
                        contentType: item.file.type
                    });
                    item.formData.push({
                        isFolder: false
                    });
                };
                uploader.onProgressItem = function(fileItem, progress) {
                    console.info('onProgressItem', fileItem, progress);
                };
                uploader.onProgressAll = function(progress) {
                    console.info('onProgressAll', progress);
                };
                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    console.info('onSuccessItem', fileItem, response, status, headers);
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    console.info('onCancelItem', fileItem, response, status, headers);
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    console.info('onCompleteItem', fileItem, response, status, headers);
                };
                uploader.onCompleteAll = function() {
                    console.info('onCompleteAll');
                };
            }
        ]);
})(angular);

(function(angular, unedefined) {
    'use strict';

    var jsonService = function($http, $location, toastr) {

        var serviceBase = 'api/';

        var setOptionToastr = function() {
            /* toastr.options.timeOut = 1000;
              toastr.options.extendedTimeOut = 100; //time out after visit
              toastr.options.positionClass = "toast-top-right";
              toastr.options.closeButton = true;
              */
        };
        var getPromise = function(url, type, jsonData, onValidationError, jsonAction, noAlert) {

            var onSuccessCallBack = function() {
                if (type != 'GET' && !noAlert) {
                    setOptionToastr();
                    toastr.success("Success", "Done");
                }
            };

            var onErrorCallBack = function(data, status) {
                //ignore request cancellation
                if (status === 0) {
                    return;
                }

                var timeout = 3000;
                if (status == '555') {
                    var message = "";
                    for (var i = 0; i < data.Errors.length; i++) {
                        message = message + " " + data.Errors[i].error + ";";
                    }
                    setOptionToastr();
                    toastr.error("Error: " + message, "Something went wrong");
                } else if (status == '101') {
                    setOptionToastr();
                    toastr.error("Error: " + status, "Something went wrong");
                } else if (status == '302') {
                    $location.reload(true);
                } else {
                    setOptionToastr();
                    toastr.error("Error: " + status, "Something went wrong", 'trustedHtml');
                }
            };

            if (type == 'GET') {
                return $http.get(serviceBase + url, jsonData ? JSON.stringify(jsonData) : null).success(onSuccessCallBack).error(onErrorCallBack);
            }
            if (type == 'DELETE') {
                return $http.delete(serviceBase + url, jsonData ? JSON.stringify(jsonData) : null).success(onSuccessCallBack).error(onErrorCallBack);
            }
            if (type == 'PUT') {
                return $http.put(serviceBase + url, jsonData ? JSON.stringify(jsonData) : null).success(onSuccessCallBack).error(onErrorCallBack);
            } else {
                return $http.post(serviceBase + url, jsonData ? jsonData : null).success(onSuccessCallBack).error(onErrorCallBack);
            }
        };

        var get = function(url, global) {
            return getPromise(url, 'GET');
        };
        var remove = function(url, id) {
            url = url + '/' + id;
            return getPromise(url, 'DELETE');
        };

        var post = function(url, jsonData, onValidationError, jsonAction, noAlert) {
            return getPromise(url, 'POST', jsonData, onValidationError, jsonAction, noAlert);
        };

        var put = function(url, jsonData, onValidationError, jsonAction, noAlert) {
            return getPromise(url, 'PUT', jsonData, onValidationError, jsonAction, noAlert);
        };
        return {
            get: get,
            post: post,
            put: put,
            remove: remove
        };
    };

    jsonService.$inject = ['$http', '$location', 'toastr'];

    angular.module('C3web.services').factory('JsonService', jsonService);
})(angular);

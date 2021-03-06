(function(angular) {
    'use strict';
    angular.module('C3web.filters')
        .filter('highlight', ['$sce', 'utility', function($sce, utility) {
            return function(text, pattern) {
                if (angular.isUndefined(text) || angular.isUndefined(pattern)) {
                    return text;
                }

                text = text && text.replace(new RegExp(utility.escapeRegexp(pattern), 'gi'), function(match) {
                    return '<span class="highlighted">' + match + '</span>';
                });

                return text;
            };
        }]);
})(angular);

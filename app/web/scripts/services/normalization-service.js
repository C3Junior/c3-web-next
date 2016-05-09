(function(angular, undefined) {
    var normalizationService = function normalizationService() {
        return function (src, dst) {
            dst = dst || 'normalized';
            
            return function(collection) {
                var min = collection[0][src], 
                    max = collection[0][src];
                
                for(var i = 1, length = collection.length; i < length; i++) {
                    var item = collection[i];
                    var value = item[src]
                    
                    if (value > max) {
                        max = value;
                    }
                    
                    if (value < min) {
                        min = value;
                    }
                }
                
                return collection.map(function (item) {
                    var clone = angular.copy(item);
                    
                    if(min === max) {
                        clone[dst] = item[src];
                    } else {
                        clone[dst] = (item[src] - min) / (max - min);   
                    }
                    return clone;   
                });
            };
        };
    };

    normalizationService.$inject = [];     

    angular.module('C3web.services')
        .factory('normalizationService', normalizationService);

})(angular);

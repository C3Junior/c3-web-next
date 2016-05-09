'use strict';

describe('normalization service', function () {
    var _, normalizationService;

    beforeEach(module('C3web.services'));

    beforeEach(inject(['normalizationService',
        function (n) {
            normalizationService = n;
        }
    ]));
    
    it('should return function', function () {
       var normalizer = normalizationService();
       expect(normalizer).toBeDefined(); 
    });
    
    describe('normalize function', function () {
        it('should write result to a given property', function () {
            var normalize = normalizationService('source', 'output');
            var sourceCollection = [{source: 1}];
            var outputCollection = normalize(sourceCollection);
            expect(outputCollection[0].output).toBe(1);
        });
        
        it('should not modify source collection', function () {
            var normalize = normalizationService('source', 'output');
            var sourceCollection = [{source: 1}];
            var outputCollection = normalize(sourceCollection);
            expect(sourceCollection[0].output).toBeUndefined();
        });
        
        it('should use default property if dst is not defined', function () {
            var normalize = normalizationService('source');
            var sourceCollection = [{source: 1}];
            var outputCollection = normalize(sourceCollection);
            expect(outputCollection[0].normalized).toBe(1);       
        });
        
        it('should normalize source collection', function () {
            var normalize = normalizationService('source', 'output');
            var sourceCollection = [{source: 4}, {source: 8}, {source: 12}];
            var outputCollection = normalize(sourceCollection);
            expect(outputCollection[0].output).toBe(0);
            expect(outputCollection[1].output).toBe(0.5);
            expect(outputCollection[2].output).toBe(1);       
        });
    });
    
});
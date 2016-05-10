'use strict';

describe('highlight filter', function () {
    var highlight;

    beforeEach(module('C3web.services'));
    beforeEach(module('C3web.filters'));

    beforeEach(inject(['$filter',
        function ($filter) {
            highlight = $filter('highlight');
        }
    ]));

    // Test service availability
    it('should inject highlight filter', function () {
        expect(highlight).toBeDefined();
    });

    it('should not modify value if it doesn\'t match pattern', function () {
        var filtered = highlight('Text', 'No match');
        expect(filtered).toEqual('Text');
    });

    it('should insert single span if text has single match', function () {
        var filtered = highlight('Text', 'ex');
        expect(filtered).toEqual('T<span class="highlighted">ex</span>t');
    });

    it('should insert two spans if text has two matches', function () {
        var filtered = highlight('one match, two matches', 'match');
        expect(filtered).toEqual('one <span class="highlighted">match</span>, two <span class="highlighted">match</span>es');
    });

    it('should insert span case sensitively', function () {
        var filtered = highlight('case seNsitive', 'sens');
        expect(filtered).toEqual('case <span class="highlighted">seNs</span>itive');
    });

    it('should escape regexp characters', function () {
        var filtered = highlight('[2]$ is not expensive', '[2]$');
        expect(filtered).toEqual('<span class="highlighted">[2]$</span> is not expensive');
    });
    
    it('should return undefined if text is not defined', function () {
        var filtered = highlight(undefined, 'text');
        expect(filtered).toBeUndefined();
    });
    
    it('should return text if filter is not defined', function () {
        var filtered = highlight('text');
        expect(filtered).toBe('text');
    });
});
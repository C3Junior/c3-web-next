    angular.module('C3web.components', []);
    angular.module('C3web.controllers', []);
    angular.module('C3web.services', []);
    angular.module('C3web.directives', []);
    angular.module('C3web.filters', []);
    angular.module('C3web', [
        // ng
        'ng',
        'ui.router',
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'toastr',
        'ngTagsInput',
        'angularFileUpload',
        // C3web
        'C3web.components',
        'C3web.controllers',
        'C3web.services',
        'C3web.directives',
        'C3web.filters'
    ]);

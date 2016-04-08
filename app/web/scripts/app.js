angular.module('C3web')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(false);

            $urlRouterProvider.otherwise('/');
            $urlRouterProvider.when('/group/:id', '/group/:id/journal');

            $stateProvider
                .state('root', {
                    url: '/',
                    templateUrl: 'views/home.html'
                })
                .state('groups', {
                    title: 'Group list',
                    url: '/groups',
                    templateUrl: 'views/group/group-list.html',
                    controller: 'group.groupListController'
                })
                .state('group', {
                    url: '/group/:id',
                    templateUrl: 'views/group/group.html',
                    controller: 'group.groupController'
                })
                .state('group.journal', {
                    url: '/journal',
                    templateUrl: 'views/group/group-log.html',
                    controller: 'group.groupLogController'
                })
                .state('group.settings', {
                    url: '/settings',
                    templateUrl: 'views/group/group-settings.html',
                    controller: 'group.groupSettingsController'
                })
                .state('group.files', {
                    url: '/files',
                    templateUrl: 'views/group/group-files.html',
                    controller: 'group.groupFilesController'
                })
                .state('upload', {
                    url: '/upload/:path*',
                    templateUrl: 'views/group/group-file-upload.html',
                    controller: 'fileUploadController'
                })
                .state('create-folder', {
                    url: '/create/:path*',
                    templateUrl: 'views/group/create-folder.html',
                    controller: 'createFolderController'
                })
                .state('r-suite', {
                    title: 'R Suite',
                    url: '/r_suite',
                    templateUrl: 'views/r_suite.html'
                })
                .state('k-base', {
                    title: 'Knowledge Base',
                    url: '/k_base',
                    templateUrl: 'views/k_base.html',
                    controller: 'CollectCtrl'
                })
                .state('experiments', {
                    title: 'Experiments',
                    url: '/experiments',
                    templateUrl: 'views/experiments.html'
                });
        }
    ]);

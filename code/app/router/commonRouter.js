(function() {
  'use strict';
  angular.module('fr-qa-controller').config(routerConfig);

  function routerConfig($stateProvider,
      $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/app/modules/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'DashboardController'
      })
      .state('serviceDetail', {
        url: '/service/detail',
        templateUrl: '/app/modules/service/detail.html',
        controller: 'ServiceController',
        controllerAs: 'serviceCtrl',
        params: {
          stackName: null,
          serviceStackName: null
        }
      });

    $urlRouterProvider.otherwise('/dashboard');
    $locationProvider.html5Mode(true);
  }
})();

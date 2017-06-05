(function() {
  'use strict';
  angular.module('fr-qa-controller.dashboard')
    .directive('deployService', deployService);
  function deployService() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
      },
      templateUrl: '/app/modules/dashboard/components/' +
      'deployService/deployService.html',
      controller: 'DeployServiceController',
      controllerAs: 'deployServiceCtrl',
      bindToController: true
    };
  }
})();

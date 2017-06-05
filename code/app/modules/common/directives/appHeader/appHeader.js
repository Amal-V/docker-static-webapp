(function() {
  'use strict';
  angular.module('fr-qa-controller.common')
    .directive('appHeader', appHeader);

  function appHeader() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/app/modules/common/directives/' +
      'appHeader/appHeader.html',
      controller: function() {
        const vm = this;
        vm.title = 'FR QA Service Management System';
      },
      controllerAs: 'appHeaderController'
    };
  }
})();

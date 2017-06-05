(function() {

  'use strict';

  angular.module('fr-qa-controller.dashboard')
    .factory('dashboardService', DashboardService);

  function DashboardService(apiService) {
    const param = {
      path: '/services',
      body: {}
    };

    var getAllServices = function() {
      return apiService.getData(param);
    };

    return {
      getAllServices: getAllServices
    };
  }
}());

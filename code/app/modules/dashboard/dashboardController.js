(function() {

  'use strict';

  angular.module('fr-qa-controller.dashboard')
    .controller('DashboardController', DashboardController);

  function DashboardController(dashboardService, $mdDialog,
      $state, $scope, $log, $document, messages, SERVICES) {
    var vm = this;
    vm.isLoading = true;
    vm.isNoData = false;
    vm.gridActions;
    vm.gridOptions = {
      data: [],
      getData:getServerData
    };
     
    $scope.logHello = function (){
      $log.log(SERVICES.SERVICE_ONE_URL);
      $log.log(SERVICES.SERVICE_TWO_URL);
    }

    function getServerData(params, callback) {
      vm.isLoading = true;
      dashboardService.getAllServices()
        .then( function(response) {
          var data = response.data;          
          data.output = data.output || 'NA';
          var totalItems = response.data.length;
          callback(data, totalItems);
          vm.isLoading = false;
          vm.isNoData = !response.data.length;
        })
        .catch(function(e) {
          vm.isLoading = false;
          if (e.data != null) {
            messages.showToast(e.data.message +
            ': Something went wrong please try again.');
          }
          else {
            messages.showToast('Something went wrong please try again.');
          }
        });
    }

    vm.showAddService = function(ev) {
      $mdDialog.show({
        controller: 'DeployServiceController',
        controllerAs: 'deployServiceCtrl',
        templateUrl: '/app/modules/dashboard/components/' +
        'deployService/deployService.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };


    vm.refreshServiceList = function() {
      vm.isLoading = true;
      dashboardService.getAllServices()
        .then( function(response) {
          var data = response.data;
          vm.gridOptions.data = (data);
          vm.gridActions.refresh();
          vm.isLoading = false;
          vm.isNoData = !response.data.length;
        })
        .catch(function(e) {
          vm.isLoading = false;
          if (e.data != null) {
            messages.showToast(e.data.message +
            ': Something went wrong please try again.');
          }
          else {
            messages.showToast('Something went wrong please try again.');
          }
        });
    };

    vm.getStatusClass = function(status) {
      switch (status) {
      case 'CREATE_COMPLETE':
      case 'DELETE_COMPLETE':
      case 'UPDATE_COMPLETE':
        return 'msg-success';
      case 'CREATE_IN_PROGRESS':
      case 'DELETE_IN_PROGRESS':
      case 'ROLLBACK_IN_PROGRESS':
      case 'UPDATE_IN_PROGRESS':
      case 'UPDATE_COMPLETE_CLEANUP_IN_PROGRESS':
      case 'UPDATE_ROLLBACK_IN_PROGRESS':
      case 'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS':
      case 'REVIEW_IN_PROGRESS':
        return 'msg-warn';
      case 'CREATE_FAILED':
      case 'ROLLBACK_FAILED':
      case 'ROLLBACK_COMPLETE':
      case 'DELETE_FAILED':
      case 'UPDATE_ROLLBACK_FAILED':
      case 'UPDATE_ROLLBACK_COMPLETE':
        return 'msg-danger';
      default: return '';
      }
    };

    vm.showDetail = function(item) {
      $state.go('serviceDetail', item);
    };
  }
})();


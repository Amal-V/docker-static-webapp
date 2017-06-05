(function() {
  'use strict';
  angular.module('fr-qa-controller.services')
    .controller('ServiceController', ServiceController);

  function ServiceController($state, apiService, $mdDialog, $log, messages) {
    var vm = this;

    const param = {
      path: '',
      body: {}
    };

    vm.service = {};

    vm.init = function() {
      if ($state.params.stackName ==null) {
        $state.go('dashboard');
      } else {
        vm.refresh();
      }
    };

    vm.goBack =function() {
      $state.go('dashboard');
    };

    vm.refresh = function() {
      var stackName = $state.params.stackName;
      param.path = '/status?stackName=' + stackName;
      apiService.getData(param)
        .then( function(response) {
          updateStatus(response.data);
        })
        .catch(function(err) {
          $log.error(err);
        });
    };

    vm.delete = function() {
      $log.log($state.params);
      param.path = '/services';
      param.body = {
        stackName: $state.params.stackName,
        serviceStackName: $state.params.serviceStackName
      };
      apiService.deleteData(param)
        .then( function(response) {
          if (response.data.success) {
            messages.showToast('Service deleted!');
            $mdDialog.hide();
            $state.go('serviceDetail', {stackName: response.data.stackName});
          } else {
            messages.showToast(response.data.message);
          }
          vm.isLoading = false;
        })
        .catch(function(err) {
          $log.error(err);
          messages.showToast('Something went wrong please try again.');
          vm.isLoading = false;
        });
    };

    var updateStatus = function(response) {
      vm.service.serviceName=response.data.StackName;
      vm.service.output=response.data.Outputs[1].OutputValue;//To change
      vm.service.status=response.data.StackStatus;
    };

    vm.init();
  }
})();

(function() {

  'use strict';
  angular.module('fr-qa-controller.dashboard')
    .controller('DeployServiceController', DeployServiceController);

  function DeployServiceController(apiService, $mdDialog, $log,
      messages, $state) {
    var vm  = this;

    vm.services = [
      'demo-app-one',
      'demo-app-two',
      'demo-app-three'
    ];

    vm.branches = [];
    vm.service = '';
    vm.branch = '';
    vm.username = '';
    vm.isLoading = false;

    const param = {
      path: '',
      body: {}
    };


    vm.hide = function() {
      $mdDialog.hide();
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.loadBranches = function() {
      param.path = '/branches';
      param.body = {
        serviceName: vm.service
      };
      apiService.getData(param)
        .then( function(response) {
          vm.branches = response.data.data;
        })
        .catch(function(err) {
          $log.error(err);
          messages.showToast('Fetching branch names failed!'+
          'please try again.');
        });
    };

    vm.deploy = function() {
      vm.isLoading = true;
      param.path = '/services/';
      param.body = {
        serviceName: vm.service,
        branchName: vm.branch,
        userName: vm.username
      };
      apiService.postData(param)
        .then( function(response) {
          if (response.data.success) {
            messages.showToast('Deployment started successfully!');
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
  }
})();

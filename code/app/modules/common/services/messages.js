(function() {

  'use strict';
  angular.module('fr-qa-controller.common').factory('messages', messages);

  function messages($mdToast, $mdDialog, $q) {

    function showToast(message) {
      $mdToast.show($mdToast.simple()
        .textContent(message)
        .position('right bottom')
        .hideDelay(3000));
    }

    function showConfirmDialog(title, message) {
      const deferred = $q.defer();

      var alert = $mdDialog.confirm({
        title: title,
        textContent: message,
        ok: 'Ok',
        cancel: 'Cancel',
        clickOutsideToClose: true,
      });

      $mdDialog.show(alert)
        .then(function() {
          alert = undefined;
          deferred.resolve();
        }, function() {
          alert = undefined;
          deferred.reject();
        });
      return deferred.promise;
    }

    function showAlert(title, message) {
      const deferred = $q.defer();

      var alert = $mdDialog.alert({
        title: title,
        textContent: message,
        ok: 'Ok',
        clickOutsideToClose: true
      });

      $mdDialog.show(alert)
        .finally(function() {
          alert = undefined;
          deferred.resolve();
        });
      return deferred.promise;
    }

    return {
      showToast: showToast,
      showAlert: showAlert,
      showConfirmDialog: showConfirmDialog
    };
  }
})();

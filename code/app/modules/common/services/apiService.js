(function() {
  'use strict';
  angular.module('fr-qa-controller.common')
    .factory('apiService', apiService);

  function apiService($http, $q, $localStorage, $log, APP) {
    console.log(APP)
    const HOST = APP.API;

    return {
      postData: function(param) {
        var deferred = $q.defer(),
          requestURL = getURL(param),
          headers = getHeader();
        $http({
          method: 'POST',
          url: requestURL,
          data: param.body,
          headers: headers
        }).then(function(response) {
          if (isError(response)) {
            deferred.reject(response);
          } else {
            deferred.resolve(response);
          }
        }, function(error) {
          onError(error);
          deferred.reject(error);
        });
        return deferred.promise;
      },
      putData: function(param) {
        var deferred = $q.defer(),
          requestURL = getURL(param),
          headers = getHeader();
        $http({
          method: 'PUT',
          url: requestURL,
          data: param.body,
          headers: headers
        }).then(function(response) {
          if (isError(response)) {
            deferred.reject(response);
          } else {
            deferred.resolve(response);
          }
        }, function(error) {
          onError(error);
          deferred.reject(error);
        });
        return deferred.promise;
      },
      getData: function(param) {
        var deferred = $q.defer(),
          requestURL = getURL(param),
          headers = getHeader();

        $http.get(requestURL, {
          params: param.body,
          headers: headers
        }).then(function(response) {
          if (isError(response)) {
            deferred.reject(response);
          } else {
            deferred.resolve(response);
          }
        }, function(error) {
          onError(error);
          deferred.reject(error);
        });
        return deferred.promise;
      },
      deleteData: function(param) {
        var deferred = $q.defer(),
          requestURL = getURL(param),
          headers = getHeader();
        $http.delete(requestURL, {params: param.body, headers: headers})
          .then(function(response) {
            if (isError(response)) {
              deferred.reject(response);
            } else {
              deferred.resolve(response);
            }
          }, function(error) {
            onError(error);
            deferred.reject(error);
          });
        return deferred.promise;
      },
      uploadData: function(params) {
        var deferred = $q.defer();
        var requestURL = params.path;
        var headers = {
          token: getAccessToken(),
        };
        headers['Content-type'] = params.options.headers['Content-type'];

        $http({
          method: 'POST',
          url: requestURL,
          data: params.body,
          headers: headers,
          transformRequest: params.options.transformRequest
        }).then(function(response) {
          deferred.resolve(response);
        }).catch(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };

    function getAccessToken() {
      var accessToken;
      try {
        accessToken = angular.copy($localStorage.accessToken);
      } catch (e) {
        accessToken = '';
      }
      return accessToken;
    }

    function getHeader() {
      var accessToken = getAccessToken();
      return {
        token: accessToken
      };
    }

    function getURL(param) {
      return HOST + param.path;
    }

    function isError(response) {
      var errorStatus = false;
      if (response.status === 200) {
        // errorStatus = !response.data.success;
        errorStatus = !(response.status === 200);
      } else {
        errorStatus = true;
      }
      return errorStatus;
    }

    function onError(error) {
      $log.error(error);
    }
  }
})();

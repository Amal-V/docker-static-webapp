(function() {
  'use strict';

  angular.module('fr-qa-controller', ['ui.router',
    'fr-qa-controller.common',
    'fr-qa-controller.dashboard',
    'fr-qa-controller.services',
    'fr-qa-controller.config',
    'ngMaterial',
    'ngStorage',
    'ngMessages',
    'md.data.table',
    'dataGrid'
  ]);

  angular.module('fr-qa-controller').config(httpConfig);
  angular.module('fr-qa-controller').config(themingConfig);
  angular.module('fr-qa-controller')
    .controller('MainController', MainController);

  function httpConfig($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //disable caching of HTTP GET requests
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  }

  function themingConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .accentPalette('red')
      .primaryPalette('red');
  }

  function MainController() {

  }

})();

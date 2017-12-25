var sssApp = angular.module('sssApp', [
  'ui.router',
  'controllers',
  'services'
]);

sssApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('app');

  $stateProvider.state('app', {
    url: '/app',
    templateUrl: function() {
      return '../form/santa_form.html'
    },
    // resolve
    controller: 'MainController as ctrl'
  });
}]);
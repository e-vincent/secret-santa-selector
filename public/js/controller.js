var controllers = angular.module('controllers', []);

controllers.controller('MainController', ['$scope', '$http', 'ExpressService', function($scope, $http, ExpressService) {
  $scope.people = [];
  $scope.pairs  = null;
  $scope.first_name = '';
  $scope.second_name = '';

  init = function() {
    ExpressService.fetch().then(
      function(success) {
        $scope.people = success;
      },
      function(error) {
        console.log('error: ', error);
      }
    );
  }

  $scope.createPerson = function() {
    ExpressService.create($scope.first_name, $scope.second_name).then(
      function(success) {
        // add new person to view list
        // could re-fetch but this is less network traffic
        $scope.people.push(success);
        $scope.pairs = null;
        // blank form
        $scope.first_name = '';
        $scope.second_name = '';
      },
      function(error) {
        console.log('error: ', error);
      }
    );
  } 

  $scope.removePerson = function(Id) {
    ExpressService.remove(Id).then(
      function(success) {
        // could also re-fetch all people
        // but this causes less network traffic
        $scope.people = $scope.people.filter(function(person) {
          return person.Id != Id
        });
        $scope.pairs = null;
      },
      function(error) {
        console.log('error: ', error);
      }
    );
  }

  $scope.generatePairs = function() {
    ExpressService.generatePairs().then(
      function(success) {
        $scope.pairs = success;
      },
      function(error) {
        console.log('error: ', error);
      }
    );
  }

  init();
}]);
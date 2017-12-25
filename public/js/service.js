var services = angular.module('services', []);

services.factory('ExpressService', ['$http', '$q', function($http, $q) {
  return {
    fetch: function() {
      var deferred = $q.defer();

      $http.get(
        '/api/v1/person',
        {}
      ).then(
        function(success) {
          return deferred.resolve(success.data);
        },
        function(error) {
          return deferred.reject(error);
        }
      );

      return deferred.promise;
    },

    create: function(first_name, second_name) {
      var deferred = $q.defer();

      $http.post(
        '/api/v1/person',
        {
          first_name: first_name,
          second_name: second_name
        },
        {}
      ).then(
        function(success) {
          return deferred.resolve(success.data);
        }, function(error) {
          return deferred.reject(error);
        }
      );

      return deferred.promise;
    },

    remove: function(id) {
      var deferred = $q.defer();

      $http.delete(
        '/api/v1/person/' + id,
        {}
      ).then(
        function(success) {
          return deferred.resolve(success);
        }, function(error) {
          return deferred.reject(error);
        }
      );

      return deferred.promise;
    }
  }
}]);
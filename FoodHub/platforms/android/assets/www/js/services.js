
angular.module('foodHub.services', [])

.factory('UserService', ['$http', '$q', function($http, $q){
	return {
		fetchUserToken: function(username) {
			return $http.get('http://localhost:8080/spring-angular/user/token/'+username)
			.then(
				function(response){
					return response.data;
				},
				function(errResponse){
					console.error('Error while fetching token');
					return $q.reject(errResponse);
				}
			);
		}
	}
}]);
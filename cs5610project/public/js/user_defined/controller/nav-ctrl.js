// Controller: NavCtrl
// app.controller("NavCtrl", function($rootScope, $scope, $http, $location, UserService){
app.controller("NavCtrl", function($scope, UserService){
    // LOGOUT
	$scope.logout = function() {
		// $http.post('/logout')
		// .success(function(response){
		// 	$location.url('/home');
		// 	console.log("logged out! " + response);
  //           // flag for ng-hide on "Login" and "Register" link
  //           $rootScope.isLoggedin = false;
		// })

		UserService.logout();
	}

	

});   
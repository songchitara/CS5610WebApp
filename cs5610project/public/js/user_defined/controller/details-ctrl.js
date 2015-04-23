app.controller('DetailsCtrl', function ($rootScope, $scope, $http, $location, MovieService, UserService) {

	
	var mvid = $rootScope.currentMovieID
	// getMovieFromWeb: get movie from the web by movie id
	MovieService.getMovieFromWeb(mvid);

	// getMovieFromDB: get movie from the database by movie id
	MovieService.getMovieFromDB(mvid);



	// getFavorites: get the user's favorite movies
	$scope.getFavorites = function(uid) {
		UserService.getFavorites(uid);
	}

	// addToFriends: add the selected user to login user's friendList
	$scope.addToFriends = function (uid) {
		UserService.addToFriends(uid);
	}



})
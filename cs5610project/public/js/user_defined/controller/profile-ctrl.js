app.controller('ProfileCtrl', function ($scope, $rootScope, $http, $filter, MovieService, UserService) {

	$scope.getMovie = function (mvid) {
		MovieService.getMovie(mvid);
	}

	$scope.goDetails = function (mvid) {
		MovieService.goDetails(mvid);
	}



	// Given a list of movie ids 
	// Return a list of movies
	$scope.getHisFavoriteMovies = function (mvids) {
		MovieService.getHisFavoriteMovies(mvids);
	}

	MovieService.getHisFavoriteMovies($rootScope.currUserMovieIds);


	// getFavoritesFromProfile: get the user's favorite movies from profile page
	$scope.getFavoritesFromProfile = function(uid) {
		UserService.getFavoritesFromProfile(uid);
	}


	// deleteMovieFromUserFavs: delete selected movie from the current user's fav movie list
	$scope.deleteMovieFromUserFavs = function (mid) {
		UserService.deleteMovieFromUserFavs(mid);
	}

	// unlikeUser: unlike the selected user
	$scope.unlikeUser = function (uid) {
		UserService.unlikeUser(uid);
	}

})
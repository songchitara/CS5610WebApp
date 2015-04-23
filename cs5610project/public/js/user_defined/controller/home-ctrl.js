app.controller('HomeCtrl', function ($rootScope, $scope, $http, $filter, MovieService) {
	
    // get top rated movies
    $http.get("http://api.themoviedb.org/3/movie/top_rated?api_key=e3ee7ba36dbb8eb956f132a51cdc6f19")
    .success(function (response) {
    	$rootScope.topMovies = response.results;
        // console.log(JSON.stringify(response));
    })


    // get now playing movies
    $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key=e3ee7ba36dbb8eb956f132a51cdc6f19")
    .success(function (response) {
        $rootScope.nowPlayingMovies = response.results;
        // console.log(JSON.stringify(response));
    })


    // add selected movie to favorite
    $scope.addToFavorites = function (movie) {
        if ($rootScope.currentUser == null) {
            alert("Please first login!");
        } else {
            MovieService.addToFavorites(movie);
        }
        
    }
   


})


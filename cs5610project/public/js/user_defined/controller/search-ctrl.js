app.controller('SearchCtrl', function ($scope, $http, $filter, MovieService) {
    // searchMovies()
	$scope.searchByTitle = ""
    $scope.searchMovies = function () {
        var title = $scope.searchByTitle;
        // var limit = 10;
        // $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=" + limit + "&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        // .success(function (response) {
        //     $scope.movies = response;
        // })
        MovieService.searchMovies(title);
    }


    // sortCol(): Sorting column using $filter("orderBy")
    var orderBy = $filter("orderBy");
    $scope.sortCol = function (predicate, reverse) {
        $scope.movies = orderBy($scope.movies, predicate, reverse);
    }


    // addToFavorites()
    $scope.addToFavorites = function (movie) {
        MovieService.addToFavorites(movie);
    }


})


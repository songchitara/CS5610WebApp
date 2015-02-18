var app = angular.module("FirstApp", []);

app.controller("myCtrl",
function ($scope, $http, $filter) {


    $scope.searchByTitle = "star wars"
    $scope.searchMovies = function () {
        var title = $scope.searchByTitle;
        var limit = 10;
        $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=" + limit + "&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.movies = response;
        })
    }

    /* Sorting column */
    var orderBy = $filter("orderBy");
    $scope.sortCol = function (predicate, reverse) {
        $scope.movies = orderBy($scope.movies, predicate, reverse);
    }



    /* Enlarge Poster */
    $scope.enlargePoster = function (index) {
        $scope.enlargedP = $scope.movies[index].urlPoster;
    }



    /****** Favorite movies add and remove ********/
    // add to favorite
    $scope.favoriteMovies = [];
    $scope.numOfFavors = 0;
    $scope.addToFavorites = function (movie) {
        // add to movie to favorite
        $scope.favoriteMovies.push(movie);
        // increment the counter of favorite movies
        $scope.numOfFavors++;

    }

    // remove favorite movie
    $scope.removeFavoriteMovie = function (movie) {
        var index = $scope.favoriteMovies.indexOf(movie);
        $scope.favoriteMovies.splice(index, 1);
        // descrease the counter of favorite movies
        $scope.numOfFavors--;
    }


    /****** Toggle hide and show******/
    $scope.togglePlot = function () {
        $scope.tPlot = !$scope.tPlot;
    }
    $scope.toggleYear = function () {
        $scope.tYear = !$scope.tYear;
    }
    $scope.toggleRating = function () {
        $scope.tRating = !$scope.tRating;
    }
    $scope.togglePoster = function () {
        $scope.tPoster = !$scope.tPoster;
    }

})
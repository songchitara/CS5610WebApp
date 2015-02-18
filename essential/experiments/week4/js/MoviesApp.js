var app = angular.module("MoviesApp", []);

app.controller("MovieController",
function ($scope, $http) {
    
    /****** $scope ************/
    var movies = [
    ];

    $scope.movies = movies;
    // remove moive
    $scope.removeMovie = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    };
    // add movie
    $scope.addMovie = function () {
        var newMovie = {
            title: $scope.movie.title,
            year: $scope.movie.year,
            plot: $scope.movie.plot
        };
        $scope.movies.push(newMovie);
    };
    // edit movie
    $scope.editMovie = function (movie) {
        $scope.movie = movie;
    };
    // update movie
    $scope.updateMovie = function (movie) {
        alert($scope.movie.title)
    };


    ////////////////////////////////////////////
    // add to favorite
    $scope.favoriteMovies = [];
    $scope.addToFavorites = function (movie) {
        $scope.favoriteMovies.push(movie);
    }

    // remove favorite movie
    $scope.removeFavoriteMovie = function (movie) {
        var index = $scope.favoriteMovies.indexOf(movie);
        $scope.favoriteMovies.splice(index, 1);
    }

    ////////////////////////

    // details of movie
    $scope.detailsMovie = function(movie) 
    {
        var imdb = movie.idIMDB;
        $http.jsonp("http://www.myapifilms.com//imdb?idIMDB=" + imdb + "&format=JSONP" + "&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.details = response;
        })
    }


    /******** $http **************/
    // search movie
    $scope.searchMovies = function () {
        var title = $scope.searchByTitle;
        $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.movies = response;
        })
    };
});
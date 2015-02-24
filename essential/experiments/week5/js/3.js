var app = angular.module('MovieApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: '3_partials/home.html'
            , controller: 'HomeCtrl'
        }).
        when('/favorite', {
            templateUrl: '3_partials/favorite.html'
            , controller: 'FavoriteCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        })
    }
])


app.controller('HomeCtrl',
    function ($scope, $filter, MovieService) {



        $scope.searchByTitle = "star wars"
        // search movies
        $scope.searchMovies = function () {
            MovieService.searchMovies($scope.searchByTitle, function (response) {
                //$scope.movies = response;

                MovieService.setMovies(response);
                $scope.movies = MovieService.getMovies();
                console.log('3.js: getMovies' + MovieService.getMovies())

            });
        }



        // add to favorite
        $scope.addToFavorites = function (movie) {
            MovieService.addToFavorites(movie);
        }




    })



app.controller('FavoriteCtrl',
    function ($scope, MovieService) {
        // remove from favorite
        $scope.removeFavoriteMovie = function (movie) {
            MovieService.removeFavoriteMovie(movie);
            //update number of favorite movies
            $scope.numOfFavors = MovieService.getNumOfFavors();
        }

        // update favorite movies
        $scope.favoriteMovies = MovieService.getFavorites();

        //update number of favorite movies
        $scope.numOfFavors = MovieService.getNumOfFavors();
    })
var app = angular.module('MovieApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: '2_partials/home.html'
            , controller: 'HomeCtrl'
        }).
        when('/favorite', {
            templateUrl: '2_partials/favorite.html'
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
                $scope.movies = response;
            });
        }

        
        // add to favorite
        $scope.addToFavorites = function (movie) {
            MovieService.addToFavorites(movie);
        }



        
    })


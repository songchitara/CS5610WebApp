var app = angular.module('MovieApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: '1_partials/home.html'
           // , controller: 'HomeCtrl'
        }).
        when('/favorite', {
            templateUrl: '1_partials/favorite.html'
        }).
        otherwise({
            redirectTo: '/home'
        })
    }
])


//app.controller('HomeCtrl',
//    function ($scope, MovieService) {
//        $scope.search
//    })
var app = angular.module("ProjectApp", ["ngRoute"]);




app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/search', {
            templateUrl: 'views/search/search.html',
            controller: 'SearchCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'ProfileCtrl',
            resolve : {
	            loggedin: checkLoggedin
            }
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/details', {
            templateUrl: 'views/details/details.html',
            controller: 'DetailsCtrl',
            resolve : {
                loggedin: checkLoggedin
            }
        })
        .
        otherwise({
            redirectTo: '/home'
        });

    }]);
    
    
    
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{

    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();

            // flag for ng-hide on "Login" and "Register" link
            $rootScope.isLoggedin = true;

            // update the favorite movie list rootScope 
            // $rootScope.currUserMovieIds = user.favoriteMovieList
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');

            // flag for ng-hide on "Login" and "Register" link
            $rootScope.isLoggedin = false;

            
        }
    });
    
    return deferred.promise;
};

 



    
    
 
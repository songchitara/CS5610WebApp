var app = angular.module("PassportApp", ["ngRoute"]);




app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'views/home/home.html'
        })
        .when('/profile', {
            templateUrl: 'views/profile/profile.html',
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

    
    
app.controller("NavCtrl", function($rootScope, $scope, $http, $location){
	$scope.logout = function() {
		$http.post('/logout')
		.success(function(response){
			$location.url('/home');
			console.log("logged out! " + response);
            // flag for ng-hide on "Login" and "Register" link
            $rootScope.isLoggedin = false;
		})
	}
});    


// Debug purpose: view all the users
// $http.post("/rest/user")
// .success(function (response) {
//     console.log('success debug');
// });
    
    
    
 
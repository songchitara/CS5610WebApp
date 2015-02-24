var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: '4_partials/home.html'
        }).
        when('/about', {
            templateUrl: '4_partials/about.html'
        }).
        when('/contact', {
            templateUrl: '4_partials/contact.html'
        }).
        when('/profile/:username', {
            templateUrl: '4_partials/profile.html'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;

    // logout
    $scope.logout = function () {
        $scope.currentUser = null;
        UserService.logout();
        $scope.username = null;
        $scope.password = null;
    }

    // login
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        $scope.currentUser = UserService.login(username, password);
    }
});


app.factory("UserService", function () {
    var currentUser = null;

    var users = [
        { username: "alice", password: "alice", role: "admin", courses: [] },
        { username: "bob", password: "bob", role: "faculty", courses: [1003, 1004, 1005] },
        { username: "charlie", password: "charlie", role: "student", courses: [1002, 1003, 1004] },
        { username: "dan", password: "dan", role: "faculty", courses: [1001, 1003, 1005, 1006] },
        { username: "ed", password: "ed", role: "student", courses: [1002, 1005] },
        { username: "frank", password: "frank", role: "student", courses: [1001, 1006 ]},
        { username: "grace", password: "grace", role: "faculty", courses: [1001, 1002, 1004, 1005, 1006] },

    ];

    // get users array
    var getUsers = function () {
        return users;
    }

    // logout
    var logout = function () {
        currentUser = null;
    }

    // login
    var login = function (username, password) {
        for (var u in users) {
            if (users[u].username == username) {
                if (users[u].password == password) {
                    currentUser = users[u];
                    return users[u];
                }
            }
        }
        return null;
    };

    // get current user
    var getCurrentUser = function () {
        return currentUser;
    }
    return {
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        getUsers:getUsers
    };
});

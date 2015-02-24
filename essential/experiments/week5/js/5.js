var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: '5_partials/home.html'
        }).
        when('/about', {
            templateUrl: '5_partials/about.html'
        }).
        when('/contact', {
            templateUrl: '5_partials/contact.html'
        }).
        when('/profile/:username', {
            templateUrl: '5_partials/profile.html',
            controller: 'ProfileController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("ProfileController", function ($scope, UserService, $routeParams, CourseService) {
    // get user name from url parameter
    var username = $routeParams.username;
    $scope.username = username;

    // get current users
    $scope.currentUser = UserService.getCurrentUser();

    // get courses
    $scope.courses = CourseService.getCourses();

    // get course by id
    $scope.getCourseById = function (id) {
        CourseService.getCourseById(id)
    }


    // get the courses of current users
    $scope.courseObjs = CourseService.getCoursesByIds($scope.currentUser.courses);



    // users
    $scope.users = UserService.getUsers();
});

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;
    $scope.logout = function () {
        $scope.currentUser = null;
        UserService.logout();
        $scope.username = null;
        $scope.password = null;
    }
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        $scope.currentUser = UserService.login(username, password);
    }
});

app.factory("CourseService", function () {

    var courses = [
            { id: 1001, title: "Java" },
            { id: 1002, title: "NodeJS" },
            { id: 1003, title: "AngularJS" },
            { id: 1004, title: "MongoDB" },
            { id: 1005, title: "ASP.NET" },
            { id: 1006, title: "C#" },
            { id: 1007, title: "Entity Framework" }
    ];


    // get courses by ids
    var getCoursesByIds = function (ids) {
        var coursesObj = []
        $.each(courses, function (index, course) {
            for (var i in ids) {
                if (course.id == ids[i]) {
                    coursesObj.push(course);
                }
            }
        })
        return coursesObj;
    }

    // getCourseById
    var getCourseById = function (id) {
        $.each(courses, function (index, course) {
            if (course.id == id) {
                return course.title;
            }
        })
    }

    var getCourses = function () {
        return courses
    }

    var addCourse = function (course) {
        courses.push(course);
    }

    var getCourseByIndex = function (index) {
        return courses[index];
    }

    //var getCourseByIndices = function (indices) {
    //    var responseCourses = [];
    //    for (var i in indices) {
    //        var course = courses[indices[i]];
    //        responseCourses.push(course);
    //    }
    //    return responseCourses;
    //}

    return {
        addCourse: addCourse,
        getCourseByIndex: getCourseByIndex,
        //getCourseByIndices: getCourseByIndices,
        getCourses: getCourses,
        getCourseById: getCourseById,
        getCoursesByIds: getCoursesByIds
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
        { username: "frank", password: "frank", role: "student", courses: [1001, 1006] },
        { username: "grace", password: "grace", role: "faculty", courses: [1001, 1002, 1004, 1005, 1006] },

    ];

    // get users array
    var getUsers = function () {
        return users;
    }

    var logout = function () {
        currentUser = null;
    }

    var login = function (username, password) {
        for (var u in users) {
            if (users[u].username == username) {
                currentUser = users[u];
                return users[u];
            }
        }
        return null;
    };

    var getCurrentUser = function () {
        return currentUser;
    }

    return {
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        getUsers: getUsers
    };
});

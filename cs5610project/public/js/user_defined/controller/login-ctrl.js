﻿app.controller("LoginCtrl", function ($scope, UserService) {
    $scope.login = function (user) {
    //     console.log(user);
    //     $http.post("/login", user)
    //     .success(function (response) {
    //         console.log(response);
    //         $rootScope.currentUser = response;
    //         $location.url("/profile");
    //     })
		UserService.login(user);
    }


    
});


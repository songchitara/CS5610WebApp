app.controller("RegisterCtrl", function ($scope, $http, $rootScope, $location) {
    $scope.register = function (user) {
        console.log(user);
        //
        if(user.password == user.password2) {
	        $http.post("/register", user)
	        .success(function (response) {
	            console.log(response);
                // response is false when user already exists.
                if (response==false) {
                    alert('User already exists!');
                }
	            $rootScope.currentUser = response;
	            $location.url("/profile");
        	})	
        }
        else{
            alert('Two passwords not match! Please retry.')
        }
    }

    // check if two typed passwords are the same 
    $scope.checkPwds = function () {
        if ($scope.user) {
            if ($scope.user.password && $scope.user.password2) {
                if ($scope.user.password != $scope.user.password2) {
                    return 'Passwords do not match!';
                } 
            }
            
        }   
            
    }
})
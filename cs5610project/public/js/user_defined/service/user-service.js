
// Factory: UserService
app.factory("UserService", function ($http, $rootScope, $location, MovieService) {
    var currentUser = null;

    // Login: login()
    var login = function (user) {
    	$http.post("/login", user)
    	.success(function (response) {
    		console.log(response);
            $rootScope.currentUser = response;
            currentUser = $rootScope.currentUser;
            $location.url("/profile");

            // for showing the GetMovies button
            $rootScope.btnGetMovies = true;

            if (! response.length) {  // if normal user
                // separately store the current user's favorite movie ids
                $rootScope.currUserMovieIds = response.favoriteMovieList;
            } else {  // else if admin user
                console.log("logged as admin!")
                $rootScope.currUserMovieIds = [];
            }
            

            // initialize the currUserMovies scope
            $rootScope.currUserMovies = []

            // initialize the scope of currUserFriends
            $rootScope.currUserFriends = $rootScope.currentUser.friendList;



    	})
    }

    // Logout: logout()
    var logout = function () {
    	$http.post('/logout')
		.success(function(response){
			$location.url('/home');
			console.log("logged out! " + response);
            // flag for ng-hide on "Login" and "Register" link
            $rootScope.isLoggedin = false;

            // Once logged out, all scopes should be reset to zero.
            $rootScope.currUserMovieIds = []
            $rootScope.currUserFriends = []
            $rootScope.currUserMovies = []
            // Profile page
            $rootScope.selectedUserFavoriteMoviesFromProfile = []
            $rootScope.selectedUserFromProfile = []
		})
    }

    // Register: register()
    var register = function (user) {
        console.log(user);
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

    
    // 'DetailsCtrl': getFavorites(String)  
    //  Given the selected user's id(username)
    //  Get the user's favorite movies

    var getFavorites = function (uid) {
        $http.get('/rest/user/' + uid)
        .success(function (response) {
            // console.log(JSON.stringify(response));
            $rootScope.selectedUser = response;

            // from the movie ids, get all the movies
            var movies = []
            response.favoriteMovieList.forEach(function(mid) {
                console.log(mid);
                $http.get('/rest/movie/' + mid)
                .success(function (response) {
                     movies.push(response)
                })
            })

            $rootScope.selectedUserFavoriteMovies = movies;
        });
    }


    // 'ProfileCtrl': getFavoritesFromProfile(String)  
    //  Given the selected user's id(username)
    //  Get the user's favorite movies
    var getFavoritesFromProfile = function (uid) {
        $http.get('/rest/user/' + uid)
        .success(function (response) {
            // console.log(JSON.stringify(response));
            $rootScope.selectedUserFromProfile = response;

            // from the movie ids, get all the movies
            var movies = []
            response.favoriteMovieList.forEach(function(mid) {
                console.log(mid);
                $http.get('/rest/movie/' + mid)
                .success(function (response) {
                     movies.push(response)
                })
            })

            $rootScope.selectedUserFavoriteMoviesFromProfile = movies;
        });
    }


    // 'DetailsCtrl': POST addToFriends(String)  
    //  Given the selected user's id(username)
    //  Add the selected user (suid) to the current loggedin user's friend list
    var addToFriends = function (suid) {
        var scuids = [suid, $rootScope.currentUser.username]
        // $http.post('/rest/user/' + suid, $rootScope.currentUser.username)
        $http.post('/rest/user', scuids)
        .success(function (response) {

            if (response == 0) { // If you already liked this user
                alert("You've already liked this user!");
            } else { // If not yet
                // update the currUserFriends scope
                $rootScope.currUserFriends = response;
            }
            
        })
    }


    // 'ProfileCtrl': DELETE deleteMovieFromUserFavs
    var deleteMovieFromUserFavs = function (mid) {
        // alert("called func in UserService");
        // var combinedObj = {'mid': mid, 'uid': $rootScope.currentUser.username}  // mid + uid
        // $http.delete('/rest/user', {params: {'mid': mid, 'uid': $rootScope.currentUser.username}})
        $http.delete('/rest/user/fav_movies/' +  [mid, $rootScope.currentUser.username])
        .success(function (response) {
            // update the scope of currUserMovies
            $rootScope.currUserMovieIds = response;
            MovieService.getHisFavoriteMovies($rootScope.currUserMovieIds);
        })
    }



    // 'ProfileCtrl': unlike the selected user
    var unlikeUser = function (suid) {
        $http.delete('/rest/user/friends/' + [suid, $rootScope.currentUser.username]) // suid + cuid
        .success(function (response) {
            $rootScope.currUserFriends = response;
        })
    }


    return {
        // 'LoginCtrl'
        login: login,
        logout: logout,
        // 'RegisterCtrl'
        register: register,
        // 'DetailsCtrl'
        getFavorites: getFavorites,
        addToFriends: addToFriends,
        // 'ProfileCtrl'
        getFavoritesFromProfile: getFavoritesFromProfile,
        deleteMovieFromUserFavs: deleteMovieFromUserFavs,
        unlikeUser: unlikeUser

    };
});
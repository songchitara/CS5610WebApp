// Factory: MovieService
app.factory("MovieService", function ($q, $http, $rootScope, $filter, $location, $window) {


    // SearchCtrl: searchMovies() via tmdb
    var searchMovies = function (title) {
        $http.get("https://api.themoviedb.org/3/search/movie?api_key=e3ee7ba36dbb8eb956f132a51cdc6f19&query=" + title)
        .success(function (response) {
            $rootScope.movies = response;
        })
    };

    // SearchCtrl: addToFavorites()
    var addToFavorites = function (movie) {
    	// combine the current user and selected movie as one array
    	var userAndMovie = [$rootScope.currentUser, movie];

    	// console.log('$rootScope.currentUser: ' + $rootScope.currentUser.username);
    	// console.log('movie: ' + movie);
    	// console.log(typeof movie);
    	// console.log('userAndMovie: ' + userAndMovie);

    	$http.post('/rest/movie', userAndMovie)
        .success(function (response) {
            console.log('Success added movie to: ' + JSON.stringify(response));
            

            // update the favorite movie list rootScope 

            $rootScope.currUserMovieIds = response.favoriteMovieList;
        })
    }


    // 'ProfileCtrl': getMovie(mvid)
    // given a movie id, return the corresponding movie object from Database
    var getMovie = function (mvid) {
    	$http.get('/rest/movie/' + mvid)
    	.success(function (response) {
    		// console.log('getMovie returns: ' + JSON.stringify(response));

    		// Tricky part: create a myMovies array, and every time the function 
    		//	been called, push the movie into this array
    		$rootScope.myMovies = $rootScope.myMovies || [];
    		$rootScope.myMovies.push(response);

    		$rootScope.theMovie = response;
    	})
    }

    // 'ProfileCtrl': go to the details page
    var goDetails = function (mvid) {
    	// console.log('Hello: ');
    	// alert("Clicked!");
    	console.log('mvid: ' + mvid);
    	$rootScope.currentMovieID = mvid;
		$location.url('/details');
		
    }




    // for showing the GetMovies button
    $rootScope.btnGetMovies = true;

    // 'ProfileCtrl'
    // Given a list of movie ids 
    // Update the global scope of current user's favorite movies: $rootScope.currUserMovies
    var getHisFavoriteMovies = function (currUserMovieIds) {
        // reset the currUserMovies scope array to empty
        $rootScope.currUserMovies = []
        // iterate get moive by id and push to movie list
        try {
            currUserMovieIds.forEach(function(mvid) {
                $http.get('/rest/movie/' + mvid)
                .success(function (response) {
                    $rootScope.currUserMovies.push(response);
                    
                    // for showing the GetMovies button
                    $rootScope.btnGetMovies = false;
                })
            })
        } catch (err) {
            console.log(err);
        }
       


    }


    // 'DetailsCtrl': getMovieFromWeb(Number) get movie from the web 
    var getMovieFromWeb = function (mvid) {
    	$http.get("http://api.themoviedb.org/3/movie/" + 
    				mvid +
    				"?api_key=e3ee7ba36dbb8eb956f132a51cdc6f19")
        .success(function (response) {
            $rootScope.currentMovieFromWeb = response;
            // console.log(JSON.stringify(response));
        })
    }


    // 'DetailsCtrl': getMovieFromDB(Number) get movie from the Database 
    var getMovieFromDB = function (mvid) {
    	$http.get('/rest/movie/' + mvid)
    	.success(function (response) {
    		$rootScope.currentMovieFromDB = response;
    	})
    }


   





	// Function Mappings
	return {
		// 'SearchCtrl'
		searchMovies: searchMovies,
		addToFavorites: addToFavorites,
		// 'ProfileCtrl'
		getMovie: getMovie,
		goDetails: goDetails,
        getHisFavoriteMovies: getHisFavoriteMovies,
		// 'DetailsCtrl'
		getMovieFromWeb: getMovieFromWeb,
		getMovieFromDB: getMovieFromDB
	};

});
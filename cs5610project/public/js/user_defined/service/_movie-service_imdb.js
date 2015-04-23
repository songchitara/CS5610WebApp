// Factory: MovieService
app.factory("MovieService", function ($http, $rootScope, $filter, $location) {
	searchMovies() via imdb
	var searchMovies = function (title) {
        var limit = 10;
        $http.jsonp("http://www.myapifilms.com/imdb?title=" 
        			+ title 
        			+ "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0\
        				&technical=0&filter=N&exactFilter=0&limit=" 
        			+ limit 
        			+ "&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0\
        				&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0\
        				&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        .success(function (response) {
            $rootScope.movies = response;
        })
	};


    // searchMovies() via tmdb
    // var searchMovies = function (title) {
    //     $http.get("https://api.themoviedb.org/3/search/movie?api_key=e3ee7ba36dbb8eb956f132a51cdc6f19&query=" + title)
    //     .success(function (response) {
    //         $rootScope.movies = response;
    //     })
    // };

	// return mapping
	return {
		searchMovies: searchMovies
	};

});
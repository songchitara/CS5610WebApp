app.factory('MovieService', function MovieService($http) {

    // initializations
    var favoriteMovies = [];
    var numOfFavors = 0;

    var movies = [];

    // set movies
    var setMovies = function (mvs) {
        movies = mvs
        console.log(movies)
    }

    // get movies
    var getMovies = function () {
        return movies
    }

    // search for movies
    var searchMovies = function (title, callback) {
        var limit = 10;
        $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=" + limit + "&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        .success(callback);
    }

    // add to favorites
    var addToFavorites = function (movie) {
        favoriteMovies.push(movie);
        // increment the favorite movie counter
        numOfFavors++;
    }

    // get favorite movies
    var getFavorites = function () {
        return favoriteMovies;
    }

    // get the num of favorite movies
    var getNumOfFavors = function () {
        return numOfFavors;
    }

    // remove from favorite
    var removeFavoriteMovie = function (movie) {
        var index = favoriteMovies.indexOf(movie);
        favoriteMovies.splice(index, 1);
        // descrease the counter of favorite movies
        numOfFavors--;
    }



    return {
        searchMovies: searchMovies,
        addToFavorites: addToFavorites,
        getFavorites: getFavorites,
        getNumOfFavors: getNumOfFavors,
        removeFavoriteMovie: removeFavoriteMovie,
        setMovies: setMovies,
        getMovies: getMovies
    }
});

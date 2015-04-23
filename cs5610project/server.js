var express = require('express');
var app = express();
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost:test');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(cookieParser());
app.use(session({ secret: 'this is the secret' }));
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(__dirname + '/public'));



///////////////////////////////// Database: Mongoose /////////////////////////////////////

// Set up the MongoDB connection string (remotely/locally)
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/proj5610';
// Connect to that connectionString
mongoose.connect(connectionString);
// get notified if we connect successfully or if a connection error occurs
var db = mongoose.connection;
// error connection
db.on('error', console.error.bind(console, 'connection error:'));


// UserSchema
	var UserSchema = new mongoose.Schema({
		username: String,
		password: String,
		friendList: [String],
		favoriteMovieList: [Number]
	});

	// MovieSchema
	var MovieSchema = new mongoose.Schema({
		id: Number,
		title: String,
		year: String,
		rating: Number,
		posterURL: String,
		userList: [String]
	});

  	///////// Models ////////////////////////

  	// UserModel
  	var UserModel = mongoose.model("UserModel", UserSchema);

  	// MovieModel
  	var MovieModel = mongoose.model("MovieModel", MovieSchema);


  	/////////// New instances /////////////////////
  	var alice = new UserModel({
  		username: 'alice',
		password: 'alice',
		friendList: [],
		favoriteMovieList: []
  	});
  	// alice.save();

  	var m1 = new MovieModel({
		id: 122917,
		title: 'The Hobbit: The Battle of the Five Armies',
		year: '2014',
		rating: 7.3,
		posterURL: '/qrFwjJ5nvFnpBCmXLI4YoeHJNBH.jpg',
		userList: []
  	})
  	// m1.save()




///////////////////////////////// Authentication: Passport /////////////////////////////////

// LocalStrategy paired with app.post('/login', passport.authenticate('local'), ...)
passport.use(new LocalStrategy(
function (username, password, done) {

	// Administrator
	if (username=='admin' && password=='admin') {
		UserModel.find({}, function(err, users) {
			return done(null, users);
		})
	}
	else {  // Normal user
	    UserModel.findOne({username: username, password: password}, function(err, user){
	        if(user) {
		        return done(null, user);
	        } else {
	        	return done(null, false, {message: 'Incorrect username or password.'});
	        }
    	})
    }
}));


// serializeUser
passport.serializeUser(function (user, done) {
    done(null, user);
});

// deserializeUser
passport.deserializeUser(function (user, done) {
    done(null, user);
});

// POST: receive login info
app.post('/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    console.log(user);
    res.json(user);
})

// GET: the authenticated user
// auth(), paired with app.get('/rest/user', auth, ...)
var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else {
        next();
    }
}
// Get auth user
app.get('/rest/user', auth, function (req, res) {
    res.json(users);
})


// POST: LOGOUT
app.post('/logout', function(req, res) {
	req.logout();
	res.send(200);
});


// GET: LOGGED IN
app.get("/loggedin", function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
})



// POST: REGISTER (improved version: check if user already exists)
// app.post("/register", function(req, res) {
// 	UserModel.findOne({username: req.body.username}, 
// 		function(err, user){
// 			// if user already exists
// 			if (user) {
// 				console.log('User already exists!');
// 				// send back the false flag tell the client user exists
// 				res.send(false);
// 			} else { // else register the new user
// 				var newUser = new UserModel(req.body);
// 				newUser.favoriteMovieList = [];
// 				newUser.friendList = [];
// 				newUser.save(function(err, user) {
// 					req.login(user, function(err) {
// 						if (err) {
// 							 return next(err)
// 						};
// 						console.log('User registration succesful.')
// 						res.json(user);
// 					})
// 				});	
// 			}
// 		})	
// })


// New register, added friendList
app.post("/register", function(req, res) {
	UserModel.findOne({username: req.body.username}, 
		function(err, user){
			// if user already exists
			if (user) {
				console.log('User already exists!');
				// send back the false flag tell the client user exists
				res.send(false);
			} else { // else register the new user
				var newUser = new UserModel(req.body);
				newUser.favoriteMovieList = [];
				newUser.friendList = [];
				newUser.save(function(err, user) {
					req.login(user, function(err) {
						if (err) {
							 return next(err)
						};
						console.log('User registration succesful.')
						res.json(user);
					})
				});	
			}
		})	
})




////////////////////////////////// Normal CRUD Operations ////////////////////////////////

// Add movie from Search page
app.post('/rest/movie', function (req, res) {


	// get the combined current user and movie array
    var userAndMovie = req.body;
    // separate the current user and movie
    var user = userAndMovie[0];
    var movie = userAndMovie[1];

    console.log('user: ' + user);
    console.log('movie: ' + movie);
    

	// Validate if the user has already favored the movie
    UserModel.findOne({username: user.username, favoriteMovieList: movie.id}, function (err, data) {
    	// If the user has already favored this movie
    	if (data) {
    		console.log("You've already liked this movie!");
    		console.log('line289 data.username: ' + data.username);
    	} else {  // else the user hasn't liked the movie yet, add the movie to favorite list
    		console.log('You have not liked this movie yet.')
    		// console.log('line292 user: ' + user);
    		// console.log('user.favoriteMovieList: ' + user.favoriteMovieList);
    		// console.log('user.username: ' + user.username);
    		// console.log('user.friendList: ' + user.friendList);

		    // find the user, insert the movie into favorite list, then save
		    UserModel.findOne({username: user.username}, function (err, data) {
		    	data.favoriteMovieList.push(movie.id); 
		    	data.save(function (err, doc) {
		    		// send back the updated user
		    		res.json(data);

		    		// Find the movie or create this movie into db
				    MovieModel.findOne({id: movie.id}, function (err, data) {
				    	var isFavorited = false;

				    	// if the movie id already exists in the database,
						// then only add the user into the userList of 
						// the existed movie
				    	if (data) {
				    		// console.log(data);
				    		console.log('Movie already in the database, only add to the userList.');
				    		data.userList.push(user.username);
				    		data.save();
				    	} 
				    	else {  // else create a new movie in the database
				    		console.log('Create new movie into database.')
					    	var newMovie = new MovieModel({
						        id: movie.id,	
						        title: movie.title,
						        year: movie.release_date.substring(0,4),
						        rating: movie.vote_average,
						        posterURL: movie.poster_path,
						        userList: [user.username]
					    	});
					    	// save
					    	newMovie.save();
					    }
				    })
		    	})
		    	
		    })
    	}
    })
    
});



// Get movie obj by given the movie id
app.get('/rest/movie/:mvid', function (req, res) {
	MovieModel.findOne({id: req.params.mvid}, function (err, data) {
		// found the movie, return the movie obj
		res.json(data);
	})
});


// Get the user's favorite movies by given the uid(username)
// (the function just returned the entire user object)
app.get('/rest/user/:uid', function (req, res) {
	UserModel.findOne({username: req.params.uid}, function (err, data) {
		res.json(data)
	})
})


// Add selected user (suid) to the current loggedin user's (cuid) friendList
app.post('/rest/user', function (req, res) {
	var suid = req.body[0]; // get the selected user's id
	var cuid = req.body[1];  // get the current loggedin user's id

	UserModel.findOne({username: cuid}, function (err, data) {
		if (data.friendList.indexOf(suid) != -1) { // Already liked this user
			res.json(0);
		}
		else { // Haven't like the user yet, so add to liked list.
			data.friendList.push(suid);
			data.save(function (err, doc) {
				res.json(data.friendList);
			});
		}
		
	})
})


// Delete movie from favorite movie list of user
app.delete('/rest/user/fav_movies/:obj', function (req, res) {
	var obj = req.params.obj; // e.g. "244786,chi"
	var mid = Number(obj.split(",")[0]);  // get movie id
	var uid = obj.split(",")[1];  // get user id

	UserModel.findOne({username: uid}, function (err, data) {
		if (data) {
			// console.log('UserModel.findOne.data: ' + data);
			var targetIdx = data.favoriteMovieList.indexOf(mid);
			// console.log('data.favoriteMovieList.indexOf(mid): ' + targetIdx);
			if (targetIdx > -1) { // movie in favor list
				data.favoriteMovieList.splice(targetIdx, 1); // remove that movie from favor list
				data.save(function (err, doc) {
					// console.log("data.favoriteMovieList: " + data.favoriteMovieList);
					res.json(data.favoriteMovieList);
				})
			}
			
		} else {
			console.log(err);
		}
		
	})

})


// Delete user from friend list
app.delete('/rest/user/friends/:obj', function (req, res) {
	var obj = req.params.obj;
	var suid = obj.split(",")[0]; // get selected user id
	var cuid = obj.split(",")[1]; // get current user id
	console.log("suid: " + suid);
	console.log("cuid: " + cuid);

	UserModel.findOne({username: cuid}, function (err, data) {
		var tgtIdx = data.friendList.indexOf(suid);
		if (tgtIdx > -1) {
			data.friendList.splice(tgtIdx, 1);
			data.save(function (err, doc) {
				res.json(data.friendList);
			})
		}
	})
})




// app.listen(3000);
/////////////////////////// Listening ///////////////////////////////////////////////////
// Set up server IP address and port # using env variables/defaults.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; // use local ip if no env variable
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; // use local port if no env variable

app.listen(port, ip);





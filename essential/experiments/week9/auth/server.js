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

// Set up the MongoDB connection string (remotely/locally)
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';
// Connect to that connectionString
mongoose.connect(connectionString);

/*
var users =
[
    {username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonderland', roles: ['admin', 'student', 'instructor']},
    {username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', roles: ['student']},
    {username: 'charlie', password: 'charlie', firstName: 'Charlie', lastName: 'Brown', roles: ['instructor']}
];
*/

// Mongoose UserSchema
var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	first: String,
	last: String,
	email: String,
	roles: [String]
})


// Mongoose: Creat UserModel
var UserModel = mongoose.model("UserModel", UserSchema);


// Mongoose: create and insert new data
var alice = new UserModel({
	username: 'alice',
	password: 'alice',
	first: 'Alice',
	last: 'Wonderland',
	email: 'alice@wonderland.com',
	roles: ['admin', 'faculty']
})
//alice.save();


// LocalStrategy paired with app.post('/login',...)
passport.use(new LocalStrategy(
function (username, password, done) {

	// Administrator
	if (username=='admin' && password=='admin') {
		UserModel.find({}, function(err, users) {
			// var flaggedUser = {
			// 					data: users,
			// 					isAdmin: true
			// 				};
			return done(null, users);
		})
	}
	else {  // Normal user
	    UserModel.findOne({username: username, password: password}, function(err, user){
	        if(user) {
	       //  	var flaggedUser = {
	       //  						data: user,
								// 	isAdmin: false
								// };
		        return done(null, user);
	        } else {
	        	return done(null, false, {message: 'Incorrect username or password.'});
	        }
    	})
    }
    // server.get('/usersList', function(req, res) {    
    // User.find({}, function (err, users) {
    //     res.send(users);
    // });
// });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

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
var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else {
        next();
    }
}
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


// POST: REGISTER (simple version)
// app.post("/register", function(req, res) {
// 	var newUser = new UserModel(req.body);
// 	newUser.role = ['user'];
// 	newUser.save(function(err, user) {
// 		req.login(user, function(err) {
// 			if (err) {
// 				 return next(err)
// 			};
// 			res.json(user);
// 		})
// 	});	
// })

// POST: REGISTER (improved version: check if user already exists)
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
				newUser.role = ['user'];
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







// app.listen(3000);
/////////////////////////// Listening ///////////////////////////////////////////////////
// Set up server IP address and port # using env variables/defaults.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; // use local ip if no env variable
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; // use local port if no env variable

app.listen(port, ip);





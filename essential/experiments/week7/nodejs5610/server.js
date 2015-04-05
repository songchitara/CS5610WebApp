var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));


///////////////////////////// NodeJS Alone Experiment /////////////////////////


var users = [
        {
            name: "Alice", role: "CS Graduate Student",
            skills: [
                 { id: 1001, name: "JavaScript" },
                 { id: 1002, name: "NodeJS" }
            ]
        },
        {
            name: "Bob", role: "Professor",
            skills: [
                { id: 1003, name: "AngularJS" },
                { id: 1004, name: "MongoDB" },
                { id: 1005, name: "ASP.NET" }
            ]
        },
        {
            name: "Charlie", role: "IT Professional",
            skills: [
                { id: 1002, name: "NodeJS" },
                { id: 1003, name: "AngularJS" },
                { id: 1004, name: "MongoDB" },
                { id: 1006, name: "C#" }
            ]
        },
        {
            name: "Dan", role: "CS Undergraduate Student",
            skills: [
                { id: 1005, name: "ASP.NET" }
            ]
        },
        {
            name: "Ed", role: "Professor",
            skills: [
                { id: 1001, name: "JavaScript" },
                { id: 1002, name: "NodeJS" },
                { id: 1003, name: "AngularJS" },
                { id: 1004, name: "MongoDB" },
                { id: 1005, name: "ASP.NET" }
            ]
        }
];


// ----------------------------- Ex-1: GET all --------------------------------
// GET - all
app.get('/api/user', function (req, res) {
    res.json(users);
})


// ----------------------------- Ex-2: GET specific one --------------------------------
// GET - one by index
app.get('/api/user/:idx', function (req, res) {
    var idx = req.params.idx;
    res.json(users[idx].skills);
})

// ----------------------------- Ex-3: POST -------------------------------
app.post('/api/user', function (req, res) {
    var obj = req.body;
    obj.skills = [];
    users.push(obj);
    res.json(users);
})


// ----------------------------- Ex-4: PUT -------------------------------
app.put('/api/user/:idx', function (req, res) {
    var obj = req.body; // get the edited user 
    var idx = req.params.idx; // parse the index
    users[idx] = obj; // Update the users array according to the received user data
    res.json(obj);  // *OPTIMIZED*Instead of sending back the whole users, we only 
                    //need to send back the updated user.
})

// ----------------------------- Ex-5: DELETE -------------------------------
app.delete('/api/user/:idx', function (req, res) {
    var idx = req.params.idx;
    users.splice(idx, 1);
    res.json(users);
})



///////////////////////////// MongoDB Experiment////////////////////////////////////////////

// connect to mongodb locally
//mongoose.connect('mongodb://localhost/cs5610');

// Show all the environment variables
//app.get('/process', function (req, res) {
//    res.json(process.env);
//});


// Set up the MongoDB connection string (remotely/locally)
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';
// Connect to that connectionString
mongoose.connect(connectionString);


// SkillSchema
var SkillSchema = new mongoose.Schema({
    sid: Number,
    name: String
});

// UserSchema
var UserSchema = new mongoose.Schema({
    name: String,
    role: String,
    skills: [SkillSchema]
}, {collection: 'user'});
  
// UserModel
var UserModel = mongoose.model('UserModel', UserSchema);

var user1 = new UserModel({
    name: "alice", role: "CS Graduate Student",
    skills: [
         { sid: 1001, name: "JavaScript" },
         { sid: 1002, name: "NodeJS" }
    ]
});
user1.save();

var user2 = new UserModel({
    name: "bob", role: "Professor",
    skills: [
        { sid: 1003, name: "AngularJS" },
        { sid: 1004, name: "MongoDB" },
        { sid: 1005, name: "ASP.NET" }
    ]
});
user2.save();


var user3 = new UserModel({
    name: "charlie", role: "IT Professional",
    skills: [
        { sid: 1002, name: "NodeJS" },
        { sid: 1003, name: "AngularJS" },
        { sid: 1004, name: "MongoDB" },
        { sid: 1006, name: "C#" }
    ]
});
user3.save();

var user4 = new UserModel({
    name: "dan", role: "CS Undergraduate Student",
    skills: [
        { sid: 1005, name: "ASP.NET" }
    ]
});
user4.save();

var user5 = new UserModel({
    name: "ed", role: "Professor",
    skills: [
        { sid: 1001, name: "JavaScript" },
        { sid: 1002, name: "NodeJS" },
        { sid: 1003, name: "AngularJS" },
        { sid: 1004, name: "MongoDB" },
        { sid: 1005, name: "ASP.NET" }
    ]
});
user5.save();


// ----------------------------- Ex1: MongoDB GET All -----------------------------
app.get('/api/mdb/user', function (req, res) {
    UserModel.find(function (err, data) {
        res.json(data)
    })
})

// ----------------------------- Ex2: MongoDB GET By Id -----------------------------
app.get('/api/mdb/user/:id', function (req, res) {
    var id = req.params.id;
    UserModel.findById(id, function (err, data) {
        res.json(data.skills)
    })
})

 
// ----------------------------- Ex3: MongoDB POST -------------------------------
app.post('/api/mdb/user', function (req, res) {
    var obj = req.body;
    obj.skills = [];

    var user1 = new UserModel({
        name: obj.name,
        role: obj.role});
    user1.save(function (err, doc) {
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
    
});

// ----------------------------- Ex4: MongoDB PUT -------------------------------
app.put('/api/mdb/user/:id', function (req, res) {
    var obj = req.body; // get the edited user 
    var id = req.params.id;

    delete obj._id;

   // UserModel.update({ _id: req.params.id }, { $set: req.body }, function (err, doc) {
    UserModel.update({ _id: id }, { $set: obj }, { upsert: true }, function (err, doc) {
        UserModel.findById(id, function (err, data) {
            res.json(data)
        })
    })
})

// ----------------------------- Ex5: MongoDB DELETE -------------------------------
app.delete('/api/mdb/user/:id', function (req, res) {
    // Here i'm using findByIdAndRemove instead of findById to avoid racing problem
    UserModel.findByIdAndRemove(req.params.id, function (err, doc) {
        UserModel.find(function (err, data) {
            res.json(data);
        })
    })
});




/////////////////////////// Listening ///////////////////////////////////////////////////
// Set up server IP address and port # using env variables/defaults.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; // use local ip if no env variable
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; // use local port if no env variable

app.listen(port, ip);
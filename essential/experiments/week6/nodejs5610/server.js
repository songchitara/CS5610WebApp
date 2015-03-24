var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

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




// Set up server IP address and port # using env variables/defaults.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; // use local ip if no env variable
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; // use local port if no env variable

app.listen(port, ip);
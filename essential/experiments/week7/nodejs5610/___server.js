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
            name: "Alice", title: "CS Graduate Student",
            skills: [
                 { id: 1001, name: "JavaScript" },
                 { id: 1002, name: "NodeJS" }
            ]
        },
        {
            name: "Bob", title: "Professor",
            skills: [
                { id: 1003, name: "AngularJS" },
                { id: 1004, name: "MongoDB" },
                { id: 1005, name: "ASP.NET" }
            ]
        },
        {
            name: "Charlie", title: "IT Professional",
            skills: [
                { id: 1002, name: "NodeJS" },
                { id: 1003, name: "AngularJS" },
                { id: 1004, name: "MongoDB" },
                { id: 1006, name: "C#" }
            ]
        },
        {
            name: "Dan", title: "CS Undergraduate Student",
            skills: [
                { id: 1005, name: "ASP.NET" }
            ]
        },
        {
            name: "Ed", title: "Professor",
            skills: [
                { id: 1001, name: "JavaScript" },
                { id: 1002, name: "NodeJS" },
                { id: 1003, name: "AngularJS" },
                { id: 1004, name: "MongoDB" },
                { id: 1005, name: "ASP.NET" }
            ]
        }
];


var websites = [
    {
        name: "Site 1", pages: [
            {
                name: "page 1, 1", widgets:
                [
                 { name: "Widget 1,1,1" },
                    { name: "Widget 1,1,2" },
                    { name: "Widget 1,1,3" },
                ]
            },
            { name: "page 1, 2", widgets: [] },
            { name: "page 1, 3", widgets: [] },
        ]
    },
    {
        name: "Site 2",
        pages: [
            { name: "page 2, 1" },
            { name: "page 2, 2" },
            { name: "page 2, 3" },
        ]
    },
    {
        name: "Site 3",
        pages: [
            { name: "page 3, 1", widgets: [] },
            { name: "page 3, 2", widgets: [] },
            { name: "page 3, 3", widgets: [] },
        ]
    },
    {
        name: "Site 4",
        pages: [
            { name: "page 4, 1", widgets: [] },
            { name: "page 4, 2", widgets: [] },
            { name: "page 4, 3", widgets: [] },
        ]
    },
    {
        name: "Site 5",
        pages: []
    }
]


app.post('/api/website', function (req, res) {
    var obj = req.body;
    websites.push(obj);
    res.json(websites);
})

app.delete('/api/website/:id', function (req, res) {
    var id = req.params.id;
    websites.splice(id, 1);
    res.json(websites);
});

app.delete('/api/website/:webId/pages/:pageId', function (req, res) {
    var webIdx = req.params.webId;
    var pageIdx = req.params.pageId;
    websites[webIdx].pages.splice(pageIdx, 1);
    res.json(websites[webIdx].pages);
})

app.get('/api/website', function (req, res) {
    res.json(websites);
});

app.get('/api/website/:id', function (req, res) {
    var id = req.params.id;
    res.json(websites[id]);
});


// Set up server IP address and port # using env variables/defaults.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; // use local ip if no env variable
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; // use local port if no env variable

app.listen(port, ip);
var app = angular.module("helloajs", []);

app.controller("helloCon",
function ($scope) {

    // employee
    var employee = {
        first: "Alice",
        last: "Wonderland"
    };

    $scope.employee;// = employee;


    // a array of employees
    var employees = [
        { first: "Ariya", last: "Song" },
        { first: "Tara", last: "Lin" },
        { first: "Chi", last: "Awang" }
    ];

    $scope.employees = employees;

});
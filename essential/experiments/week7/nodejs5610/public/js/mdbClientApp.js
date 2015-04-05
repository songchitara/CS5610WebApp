var app = angular.module('SkillsApp', []);

app.controller('SkillsCtrl', function ($scope, $http) {


    // ----------------------------- Ex-1: GET all --------------------------------
    // GET - all users
    $http.get('/api/mdb/user')
    .success(function (response) {
        $scope.users = response;
    })

    // ----------------------------- Ex-2: GET specific one --------------------------------
    // GET - view(): view the skills of selected user
    $scope.view = function (index, id) {
        $scope.isDeleted = false;
        $http.get('/api/mdb/user/' + id)
        .success(function (response) {
            $scope.skills = response;
            $scope.userIdx = index;  // store the seleted index
        })
    }

    // ----------------------------- Ex-3: POST -------------------------------
    $scope.add = function (data) {
        $http.post('/api/mdb/user', data)
        .success(function (response) {
            $scope.users = response;
        })
    }

    // ----------------------------- Ex-4: PUT -------------------------------
    $scope.isEditing = [];
    
    // the "edit" button event
    $scope.edit = function (index, id) {
        // Initialize the isEditing array to ALL false
        for (var i = 0, length = $scope.users.length; i < length; i++) {
            $scope.isEditing[i] = false;
        }
        // The element with index same as received row index should set to true.
        $scope.isEditing[index] = true;
    }

    // the "confirm" button event
    $scope.confirm = function (index, id, data) {
        $http.put('/api/mdb/user/' + id, data)
        .success(function (response) {
            $scope.users[index] = response;
            $scope.isEditing[index] = false;
        })
    }



    // ----------------------------- Ex-5: DELETE -------------------------------
    $scope.isDeleted = false;
    $scope.remove = function (id) {
        $http.delete('/api/mdb/user/' + id)
        .success(function (response) {
            $scope.users = response;
            $scope.isDeleted = true;
        })
      
    }



})
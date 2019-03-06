tourOfHeros.controller('editListController', ['$scope', '$stateParams', '$http', '$state', '$rootScope', editListControl]);

function editListControl($scope, $stateParams, $http, $state, $rootScope) {
    var id = $stateParams.id;
    var uid = $stateParams.uid;

    $scope.name = $rootScope.users[uid].data[id].first_name;
    $scope.lName = $rootScope.users[uid].data[id].last_name;

    $scope.postData = function (name, job) {
        $rootScope.users[uid].data[id].first_name = $scope.name;
        $rootScope.users[uid].data[id].last_name = $scope.lName;
        console.log(name + " " + job);
        $http({
            method: "POST",
            url: 'https://reqres.in/api/users',
            data: {
                name: name,
                job: job
            }
        })
            .then(function (response) {
                alert('Success');
                $rootScope.users[uid].data[id].first_name = $scope.name;

                $state.go('adminLog.dashboard')
            }, function (error) {
                alert('Not Successful');
                console.log(error);
            });
    }
    $scope.goBack = function () {
        $state.go('adminLog.userList')
    }
}
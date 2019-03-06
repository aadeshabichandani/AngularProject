tourOfHeros.controller('postUsersController',['$scope','$state','$stateParams','$rootScope','$http',postUsersControl]);

function postUsersControl($scope,$state,$stateParams,$rootScope,$http)
{
    var id = $stateParams.id;
    var uid = $stateParams.uid;
    // console.log($rootScope.users[uid].data[id].last_name);
     $scope.name = $rootScope.users[uid].data[id].first_name;


     $scope.goBack = function()
     {
         $state.go('adminLog.dashboard')
     }
     $scope.postData = function(name,job){
        console.log(name+" "+job);
        $http({
        method : "POST",
        url:'https://reqres.in/api/users',
        data:{
            name: name,
            job: job
        }
    })
    .then(function(response){
        alert('Success');
      $rootScope.users[uid].data[id].first_name = $scope.name ;

        $state.go('adminLog.dashboard')
        },function(error){
        alert('Not Successful');
        console.log(error);
    });
}


}

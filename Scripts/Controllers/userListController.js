tourOfHeros.controller('userListController', ['$scope', '$state', '$rootScope', userListControl]);

function userListControl($scope, $state, $rootScope) {
    $rootScope.id;
    $scope.click = function ()   //fucntion to direct users from userList to editUser for editing.
    {
        $state.go('adminLog.editUsers');
    }
}
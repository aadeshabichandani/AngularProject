tourOfHeros.controller('dashboardController', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.checkId = function (id) {
        if (id > 4) {
            return false;
        }
        else {
            return true;
        }
    }
}
]);
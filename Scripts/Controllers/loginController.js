tourOfHeros.controller('loginController', loginControl);

function loginControl($scope, credValidationService) {
    $scope.submitAction = function () {
        var email = $scope.emailLogin;
        var password = $scope.passLogin;

        credValidationService.validation(email, password); //sending credentials to a service which validates the same.
    }

}
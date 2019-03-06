tourOfHeros.service('credValidationService', ['$state', '$rootScope', function ($state, $rootScope) {
    this.validation = function (email, password) {
        if (email == 'user@jungleworks.com' && password == '123456') {
            localStorage.clear();
            localStorage.setItem('userName', 'user'); //storing role in localStorage
            $rootScope.adminLogin = false;
            $rootScope.userLogin = true;
            $state.go('userLog');
            alert('welcome ' + email + '!');
        }
        else if (email == 'admin@jungleworks.com' && password == '123456') {
            localStorage.clear();
            localStorage.setItem('userName', 'admin'); //storing role in localStorage
            $rootScope.adminLogin = true;
            $rootScope.userLogin = false;
            $state.go('adminLog');
            alert('welcome ' + email + '!');
        }
        else
            alert('Wrong Credentials!!');
    }

}])
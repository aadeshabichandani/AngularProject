
tourOfHeros.config(function ($stateProvider) {

    $stateProvider
        .state('logIn', {
            url: '/logIn',
            templateUrl: '../Views/loginView.html',
            resolve: {
                "check": function ($state)              //resolve to check if someone is already logged in or not and redirecting to their respective pages.
                {
                    if (localStorage.getItem('userName') == 'admin') {
                        alert('You are already logged in as admin!');
                        $state.go('adminLog.dashboard');
                    }
                    else if (localStorage.getItem('userName') == 'user') {
                        alert('You are already logged in as user!');
                        $state.go('userLog.userList');
                    }
                }
            }
        })
        .state('userLog', {
            url: '/userLog',
            templateUrl: '../Views/userLog.html',
            resolve: {
                "check": function ($state)        //resolve to avoid access to this page without loggin in.
                {
                    if (localStorage.length == 0) {
                        alert("Please Log in first!")
                        $state.go('logIn');
                    }
                },

                "check2": function (httpService, $rootScope) {
                    $rootScope.users = [];      //making 'users' array globally accessible.
                    return httpService.getData(1)        //fetching data from first page of reqres api.
                        .then(function (response) {
                            $rootScope.users.push(response.data); // pushing fetched data in the global 'users' array.
                            return httpService.getData(2).then(function (response)  //fetching data from second page of reqres api
                            {
                                $rootScope.users.push(response.data);
                                return httpService.getData(3).then(function (response)  //fetching data from third page of reqres api
                                {
                                    $rootScope.users.push(response.data);
                                    return httpService.getData(4).then(function (response)  //fetching data from fourth page of reqres api
                                    {
                                        $rootScope.users.push(response.data);
                                    });
                                });
                            });
                        }
                        ).catch(function (error) { console.log(error) });  //cathing all the error callbacks, if any.
                }

            }


        })
        .state('adminLog', {     //state to be visible when admin logs in.
            url: '/adminLog',
            templateUrl: '../Views/adminLog.html',
            resolve: {
                "check2": function (httpService, $rootScope) {
                    $rootScope.users = [];
                    return httpService.getData(1)            //fetching data from first page of reqres GET request.
                        .then(function (response) {
                            $rootScope.users.push(response.data);       //pushing fetched data into an array.
                            return httpService.getData(2).then(function (response)       //fetching data from second page of reqres GET request.
                            {
                                $rootScope.users.push(response.data);
                                return httpService.getData(3).then(function (response)   //fetching data from third page of reqres GET request.
                                {
                                    $rootScope.users.push(response.data);
                                    return httpService.getData(4).then(function (response)   //fetching data from fourth page of reqres GET request.
                                    {
                                        $rootScope.users.push(response.data);
                                    });
                                });
                            });

                        })
                        .catch(function (error) { console.log(error) });    //catching all the error callbacks alltogether, if any.
                }

            }


        })
        .state('userLog.userList', {     //state to be visible when user logs in.
            url: '/userList',
            templateUrl: '../Views/userList.html',


        })
        .state('adminLog.userList', {        //directs to the userlist through admin log.
            url: '/userList',
            templateUrl: '../Views/userList.html',
            resolve: {         //checking that only admin can access this page.
                "check": function ($state, $rootScope) {
                    if ($rootScope.userLogin) {
                        $state.go('userLog.userList');
                        alert('Not authorized!');
                    }
                    else if (localStorage.length == 0) //blocking the access to any one who tries to access without loggin in.
                    {
                        $state.go('logIn');
                        alert('Please login.');
                    }
                },

            }
        })

        .state('adminLog.logout', {
            url: '/login',
            resolve: {
                "check": function ($state, $rootScope) {
                    localStorage.clear();       //clearing localStorage to log out.
                    $rootScope.adminLogin = false;
                    $rootScope.userLogin = false;
                    $state.go('logIn');
                }
            }


        })
        .state('adminLog.editUsers', {
            url: '/editUsers/:uid/:id',
            templateUrl: '../Views/editUsers.html',
            controller: 'editListController',
            resolve: {
                "check": function ($state, $rootScope) {      //blocking the 'edit user' facility for normal user.
                    if ($rootScope.userLogin) {
                        $state.go('userLog.userList');
                        alert('Not authorized!');
                    }
                    else if (localStorage.length == 0) {
                        $state.go('logIn');
                        alert('Please login.');
                    }
                }
            }
        })
        .state('adminLog.dashboard', {
            url: '/dashboard',
            resolve: {
                "check": function ($state, $rootScope) {
                    if ($rootScope.userLogin) {       //blocking user from accessing admin's dashboard.
                        $state.go('userLog');
                        alert('Not currently authorized!');
                    }
                    else if (localStorage.length == 0) {
                        $state.go('logIn');
                        alert('Please login.');
                    }
                }
            },
            templateUrl: '../Views/dashboard.html',
            controller: 'dashboardController'
        })
});
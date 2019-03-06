
tourOfHeros.service('httpService', ['$http', function ($http) {
    this.getData = function (i)      //function for hitting api hits.
    {
        return $http({
            method: 'GET',
            url: "https://reqres.in/api/users?page=" + i,
        });

    }
}]);
tourOfHeros.controller('userListStyleController',['$scope',styleControl]);

function styleControl($scope)
{
    if(localStorage.getItem('userName')=='user')
    {
    $scope.roleStyle = {
        'background-color': 'red;',
    'width': '30%;',
    'margin': '8px;',
    'text-align': 'center;',
    'font-size': '30px;'
    }   
}
    else
    {
        $scope.roleStyle = {
            'background-color': 'white;',
        'width': '30%;',
        'margin': '8px;',
        'text-align': 'center;',
        'font-size': '30px;'
    }
}
}

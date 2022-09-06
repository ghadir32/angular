phoneandmore.config( function ($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: './pages/stock.html',
        controller: 'stocksController'
    })

    .when('/sell', {
        templateUrl: './pages/sell.html',
        controller: 'sellController'
    })

})
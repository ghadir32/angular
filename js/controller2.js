// sell page controllers     
phoneandmore.controller('sellController', ['$scope', '$http', function ($scope, $http) {
    $scope.nam = 'Selling';
    $scope.CurrentDate = new Date();

    $scope.dateAndTime = new Date();


    $scope.products = [];
    $scope.selProduct = [];

    $scope.modalData = {
        id: null,
        name: '$scope.getvalue',
        sold_quantity: null,
        total: null,
        dateAndTime: new Date(),
        price: null,
       
    };

    $scope.SoldList = {
        s_id: null,
        name: null,
        sold_quantity: null,
        price: null,
        total:null,
        dateAndTime:  new Date()
    }

    //get sold from the database
    $http({
        method: 'get',
        url: 'http://localhost/angular/ws/ws_stocks.php?op=8'
    }).then(function (response) {

        angular.copy(response.data, $scope.products);
        // $scope.products = response.data;
        console.log($scope.products);

    }, function (error) {
        console.log(error, 'can not get data');
    });



    //get all products names from the database
    $http({
        method: 'get',
        url: 'http://localhost/angular/ws/ws_stocks.php?op=1'
    }).then(function (response) {

        console.log(response.data, 'res');
        // $scope.selProduct = response.data;
        angular.copy(response.data, $scope.selProduct);
        // $scope.quantity;
        // $scope.TotalPrice;

    }, function (error) {
        console.log(error, 'can not get data.');
    });

    $scope.unitPrice;

    $scope.CalculateTotalPrice = function () {
        $http({
                url: 'http://localhost/angular/ws/ws_stocks.php?op=6',
                method: "POST",
                params: {
                    id: $scope.getvalue
                },
            })
            .then(function (response) {
                    // success
                    // $scope.removeRow();
                    $scope.modalData.price = parseFloat(response.data[0].price);

                    $scope.modalData.total = Number($scope.modalData.price || 0) * Number($scope.modalData.sold_quantity || 0) + '$';

                    
                },
                function (response) { 
                    // failed
                });
    }

    $scope.AddNewSold = function () {
        $scope.modalData.id= $scope.getvalue;

        $http({
                url: 'http://localhost/angular/ws/ws_stocks.php?op=7',
                method: "POST",
                params:
                //  { 
                     $scope.modalData,
                    // id: $scope.getvalue,
                    // quantity: $scope.quantity,
                    // total: $scope.TotalPrice,
                    // dateAndtime: $scope.dateAndTime
                // },
            })
            .then(function (response) {
                    //success
                    $scope.addRow = function () {
                        // $scope.modalData.price = 

                        // alert("function reached");
                        $scope.products.push(
                            // $scope.modalData
                            response.data[0]
                            // 'id': $scope.getvalue,
                            // 'name': $scope.getvalue,
                            // 'sold_quantity': $scope.quantity,
                            // 'price': $scope.pricePerItem,
                            // 'total': $scope.TotalPrice,
                            // 'dateAndTime': $scope.dateAndTime
                         );
                    };

                    $scope.addRow();

                },
                function (response) {
                    // failed
                });
    }


}]);

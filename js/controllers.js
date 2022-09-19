// stocks page controllers
phoneandmore.controller('stocksController', ['$scope', '$http', function ($scope, $http) {

    $scope.searchVal;
    // using too much $scope affects performance, because each instance of a $scope runs its own digest loop..
    // so instead  of using a $scope for each input in modal, use an object and benefit from "bind-by-reference" speciality later on..
    $scope.modalData = {
        name: null,
        quantity: null,
        cost: null,
        price: null,
        note: null
    }
    // $scope.pid = "";
    // $scope.pname = "";
    // $scope.Pquantity;
    // $scope.Pcost;
    // $scope.Pprice;
    // $scope.Pnotes = "";
    $scope.btnVal = "";


    $scope.name = 'All stocks';

    // don't initialize products as a string then add an array, it is considered bad-practice
    // $scope.products = ""; 
    $scope.products = []; // <= this is better for later improvements when we use factories and services 

    //get all products from the database
    $http({
        method: 'get',
        url: 'http://localhost/angular/ws/ws_stocks.php?op=1'
    }).then(function (response) {

        // it is better to use angular.copy() method in such cases, because arrays and objects in JS bind by reference not by value
        // So using angular.copy will bind-by-value, we don't bind-by-reference unless we need it
        // $scope.products = response.data;
        angular.copy(response.data, $scope.products);
    }, function (error) {
        console.log(error, 'can not get data.');
    });


    //editing a row
    $scope.edit = function (item) {
        // alert(event.target.id);
        //get specific product from the database to edit 

        //  you don't need to retrieve the product from database to edit it, you already have it as a parameter from view
        $scope.modalData = {};

        // parse int values
        item.id = parseInt(item.id);
        item.quantity = parseInt(item.quantity);
        item.cost = parseInt(item.cost);
        item.price = parseInt(item.price);

        angular.copy(item, $scope.modalData);

        $scope.btnVal = "Save edit";
        $scope.ShowDel = true;
    }

    //handling add/edit button 
    $scope.AddOrEdit = function () {

        if ($scope.btnVal == "Add item") {
            $http({
                    url: 'http://localhost/angular/ws/ws_stocks.php?op=3',
                    method: "POST",
                    params: $scope.modalData
                    // params: {
                    //     name: $scope.pname,
                    //     quantity: $scope.Pquantity,
                    //     cost: $scope.Pcost,
                    //     note: $scope.Pnotes,
                    //     price: $scope.Pprice
                    // },
                })
                .then(function (response) {
                        // get the record from response and push it to products array
                        $scope.products.push(response.data[0]);
                        // $scope.products.push({
                        //     'id': $scope.getvalue,
                        //     'name': $scope.pname,
                        //     'quantity': $scope.Pquantity,
                        //     'cost': $scope.Pcost,
                        //     'price': $scope.Pprice,
                        //     'note': $scope.Pnotes
                        // });

                    },
                    function (response) {
                        // failed
                    });

        } else if ($scope.btnVal == "Save edit") {

            // get the real index of updated record, so when update is done successfully, replace the record with data in modal
            // no need to retrieve anything from database since we already have all data inclucding ID
            let index = $scope.products.findIndex(x => x.id == $scope.modalData.id);
            // console.log(index);
            $http({
                    url: 'http://localhost/angular/ws/ws_stocks.php?op=5',
                    method: "POST",
                    params: $scope.modalData,
                })
                .then(function () {
                    // success
                    // replace product in array with the data was sent
                    $scope.products[index] = $scope.modalData; // notice: no need to use angular.copy() since binding values of object doesn't bind by reference
                    },
                    function (response) {
                        // failed
                    });
        }
    }




    //to delete a row;       (bug)note:doesnt work for a newely added row without refresh due to missing id
    $scope.delItem = function (idd) {
        // as I mentioned in view, we do not use $index, we instead use a built-in method with JS
        // to iterate and find it mannually
        let index = $scope.products.findIndex(x => x.id == idd);
        $http({
                url: 'http://localhost/angular/ws/ws_stocks.php?op=4',
                method: "POST",
                params: {
                    id: idd
                },
            })
            .then(function (response) {
                    // success
                    // alert(index);
                    $scope.products.splice(index, 1);


                },
                function (response) {
                    // failed
                });
    }



    //handling add item button
    $scope.add = function () {
        $scope.btnVal = "Add item";
        $scope.modalData = {
            name: null,
            quantity: null,
            cost: null,
            price: null,
            note: null
        }
        // $scope.pname = "";
        // $scope.Pquantity = "";
        // $scope.Pcost = "";
        // $scope.Pprice = "";
        // $scope.Pnotes = "";
        $scope.ShowDel = false;
    }



}]);




// sell page controllers     
// phoneandmore.controller('sellController', ['$scope', '$http', function ($scope, $http) {
//     $scope.nam = 'Selling';
//     $scope.CurrentDate = new Date();

//     $scope.dateAndTime = new Date();


//     $scope.products = [];
//     $scope.selProduct = [];

//     //get sold from the database
//     $http({
//         method: 'get',
//         url: 'http://localhost/angular/ws/ws_stocks.php?op=8'
//     }).then(function (response) {

//         angular.copy(response.data, $scope.products);
//         // $scope.products = response.data;
//         console.log($scope.products);

//     }, function (error) {
//         console.log(error, 'can not get data.');
//     });



//     //get all products from the database
//     $http({
//         method: 'get',
//         url: 'http://localhost/angular/ws/ws_stocks.php?op=1'
//     }).then(function (response) {

//         console.log(response.data, 'res');
//         $scope.selProduct = response.data;
//         angular.copy(response.data, $scope.products);
//         $scope.quantity;
//         $scope.TotalPrice;

//     }, function (error) {
//         console.log(error, 'can not get data.');
//     });

//     $scope.unitPrice;

//     $scope.CalculateTotalPrice = function () {
//         // alert("hi");
//         $http({
//                 url: 'http://localhost/angular/ws/ws_stocks.php?op=6',
//                 method: "POST",
//                 params: {
//                     id: $scope.getvalue
//                 },
//             })
//             .then(function (response) {
//                     // success
//                     // $scope.removeRow();
//                     $scope.pricePerItem = parseFloat(response.data[0].price);
//                     // $scope.unitPrice = 
//                     $scope.TotalPrice = Number($scope.pricePerItem || 0) * Number($scope.quantity || 0) + '$';

//                 },
//                 function (response) {
//                     // failed
//                 });
//     }

//     $scope.AddNewSold = function () {
//         $http({
//                 url: 'http://localhost/angular/ws/ws_stocks.php?op=7',
//                 method: "POST",
//                 params: {
//                     id: $scope.getvalue,
//                     quantity: $scope.quantity,
//                     total: $scope.TotalPrice,
//                     dateAndtime: $scope.dateAndTime
//                 },
//             })
//             .then(function (response) {
//                     // success        

//                     $scope.addRow = function () {


//                         // alert("function reached");
//                         $scope.products.push({
//                             's_id': $scope.getvalue,
//                             'name': $scope.getvalue,
//                             'sold_quantity': $scope.quantity,
//                             'price': $scope.pricePerItem,
//                             'total': $scope.TotalPrice,
//                             'dateAndTime': $scope.dateAndTime

//                         });
//                     };

//                     $scope.addRow();

//                 },
//                 function (response) {
//                     // failed
//                 });
//     }


// }]);


// //my prdcts directive
// phoneandmore.directive("alllProducts", function () {

//     return {
//         restrict: 'AECM',
//         templateUrl: 'http://localhost/angular/directives/p_direcive.html',
//         // replace: true,
//         scope: {
//             productData: "="
//         }
//     }
// });

// phoneandmore.directive('ngConfirmClick', [
//     function () {
//         return {
//             priority: 1,
//             terminal: true,
//             link: function (scope, element, attr) {
//                 var msg = attr.ngConfirmClick || "Are you sure?";
//                 var clickAction = attr.ngClick;
//                 element.bind('click', function (event) {
//                     if (window.confirm(msg)) {
//                         scope.$eval(clickAction)
//                     }
//                 });
//             }
//         };
//     }
// ])
// stocks page controllers
phoneandmore.controller('stocksController', ['$scope', '$http', function($scope, $http){

    

      $scope.searchVal;
      $scope.pid = "";
      $scope.pname = "";
      $scope.Pquantity;
      $scope.Pcost ;
      $scope.Pprice;
      $scope.Pnotes = "";
      $scope.btnVal = "";


   $scope.name = 'All stocks';
   $scope.products="";
   //get all products from the database
    $http({
        method: 'get', 
        url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=1'
      }).then(function (response){

        console.log(response.data, 'res');
        $scope.products = response.data;

    },function (error){
        console.log(error, 'can not get data.');
    });
    


    $scope.edit = function(event){
        // alert(event.target.id);
         //get specific product from the database
        $http({
            method: 'GET', 
            url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=2',
            params: {p_id: event.target.id} 

        }).then(function (response){

            // console.log (JSON.parse(JSON.stringify(response.data[0])), 'ressss');
            console.log ( response.data[0] , 'ress');

            $scope.btnVal = "Save edit";
            $scope.ShowDel = true;

            $scope.pid =   parseInt(response.data[0].id);
            $scope.pname = response.data[0].name;
            $scope.Pquantity = parseInt(response.data[0].quantity);
            $scope.Pcost = parseFloat(response.data[0].cost);
            $scope.Pprice = parseFloat(response.data[0].price);
            $scope.Pnotes = response.data[0].note;

        },function (error){
            console.log(error, 'can not get data.');
        });

    }

    //handling add/edit button 
    $scope.AddOrEdit = function(){
        if($scope.btnVal == "Add item"){

                $http({
                    url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=3',
                    method: "POST",
                    params: {
                            name: $scope.pname,
                            quantity: $scope.Pquantity,
                            cost: $scope.Pcost,
                            note: $scope.Pnotes,
                            price: $scope.Pprice
                    }, 
                    })
                .then(function(response) {
                        // success
                }, 
                function(response) { 
                        // failed
                });

        }else if($scope.btnVal == "Save edit"){

            $http({
                url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=5',
                method: "POST",
                params: {
                        id: $scope.pid,
                        name: $scope.pname,
                        quantity: $scope.Pquantity,
                        cost: $scope.Pcost,
                        note: $scope.Pnotes,
                        price: $scope.Pprice
                }, 
                })
            .then(function(response) {
                    // success

            }, 
            function(response) { 
                    // failed
            });
        }
    }




    $scope.removeRow = function () {
        alert("hhi");
        //Find the record using Index from Array.
        // var name = $scope.employees[index].employee_name;
        // if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            $scope.products.data.splice($scope.pid,1);
        // }
    }

    
    $scope.delItem = function(idd){
        
        $http({
            url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=4',
            method: "POST",
            params: {
                    id: idd
            }, 
            })
        .then(function(response) {
                // success
                // $scope.removeRow();
                
        }, 
        function(response) { 
                // failed
        });
    }

  

    //handling add item button
    $scope.add = function(){
        $scope.btnVal = "Add item";
        $scope.pname = "";
        $scope.Pquantity="";
        $scope.Pcost="" ;
        $scope.Pprice="";
        $scope.Pnotes = "";
        $scope.ShowDel = false;

    }



 }]);




// sell page controllers     
phoneandmore.controller('sellController', ['$scope', '$http', function($scope, $http){
    $scope.nam = 'Selling';
    $scope.CurrentDate = new Date();
 
    $scope.dateAndTime=new Date();
   

      //get sold from the database
      $http({
        method: 'get', 
        url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=8'
      }).then(function (response){
        $scope.products = response.data;

    },function (error){
        console.log(error, 'can not get data.');
    });



     //get all products from the database
     $http({
        method: 'get', 
        url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=1'
      }).then(function (response){

        console.log(response.data, 'res');
        $scope.selProduct = response.data;
        $scope.quantity;
        $scope.TotalPrice;

    },function (error){
        console.log(error, 'can not get data.');
    });


    $scope.CalculateTotalPrice = function(){
        // alert("hi");
        $http({
            url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=6',
            method: "POST",
            params: {
                    id: $scope.getvalue  
            }, 
            })
        .then(function(response) {
                // success
                // $scope.removeRow();
                $scope.pricePerItem = parseFloat(response.data[0].price);
                $scope.TotalPrice = Number($scope.pricePerItem || 0) * Number($scope.quantity || 0) + '$';
                
        }, 
        function(response) { 
                // failed
        });
    }

    $scope.AddNewSold = function(){
        $http({
            url: 'http://localhost/angular%20training%201/ws/ws_stocks.php?op=7',
            method: "POST",
            params: {
                    id: $scope.getvalue,
                    quantity: $scope.quantity,
                    total: $scope.TotalPrice,
                    dateAndtime: $scope.dateAndTime
            },
        })
        .then(function(response) {
            // success         
            
        }, 
        function(response) { 
                // failed
        });
    }

}]);


//my prdcts directive
phoneandmore.directive("alllProducts", function(){

    return {
        restrict: 'AECM',
        templateUrl : 'http://localhost/angular%20training%201/directives/p_direcive.html',
        // replace: true,
        scope: {
            productData: "="
        }
    }
});

phoneandmore.directive('ngConfirmClick', [
    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])
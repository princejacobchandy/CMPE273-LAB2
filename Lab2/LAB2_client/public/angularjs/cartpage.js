//loading the 'login' angularJS module
var cartpageang = angular.module('cartpageapp', []);
//defining the login controller
cartpageang.controller('cartpagecontroller', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

	$scope.cartempty=1;
	$scope.cartnotempty=0;
	
	//$scope.shoppngcart=[];

	$scope.load_the_cart = function() {
	console.log('INVOKED load_the_ads FUNCTION-going to fetch all the ads');
	$http({
			method : "POST",
			url : '/getthecart',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 300 && data.itemsInCart!="") {
				$scope.cartempty=0;
				$scope.cartnotempty=1;
				console.log("recieved 300");
				$scope.shoppingCart=data.itemsInCart;
				console.log('data.itemsInCart is ' + data.itemsInCart);
				
				$scope.jsonString = JSON.stringify(data.itemsInCart);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				console.log("Results Stringify:" + ($scope.jsonString));
				
				//console.log("$scope.shoppingCart[0].buyer_uname is " + $scope.shoppingCart[0].buyer_uname); 
				console.log("data.itemsInCart.length is " + data.itemsInCart.length); 
				$scope.totalamount=0;
				$scope.noofitems=data.itemsInCart.length;
				for(i=0;i<data.itemsInCart.length;i++)
				{
					$scope.totalamount+=(($scope.shoppingCart[i].product_qty)*($scope.shoppingCart[i].product_price));
				}
				
				
				//json_responses = {"statusCode" : 200, "data": jsonParse};
				//$scope.products=data.product_list;
				//$scope.resultlength=data.results_length;
				//$scope.jsonString = JSON.stringify(data.product_list);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				//console.log("Results Stringify:" + ($scope.jsonString));
				//$scope.places=data.itemsInCart;
				//$scope.places.push($scope.jsonString);
				//$scope.places.push({'value': 'item1'},{'value': 'item2'});
				//console.log('places is ' + $scope.places);
				//console.log('place.value ' + $scope.places);
				//$scope.addRow();
			}
			else
				{
				console.log("recieved 301");
				console.log("cart is empty");
				$scope.cartempty=1;
				$scope.cartnotempty=0;
				}
				
		}).error(function(error) {
			console.log("some error in cartpage-angular file")
		});
	
	};
	
	$scope.load_the_cart();
	
	
	
	
	$scope.removeitemfromcart = function(cartid, ptitle, buyername) {
	console.log('INVOKED deleteitfromcart FUNCTION');
	$http({
			method : "POST",
			url : '/removetheitem',
			data : {
			"cart_id" : cartid,
			"ptitle" : ptitle,
			"buyername": buyername
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 300) {
				console.log("item removed from the cart");
				$scope.load_the_cart();
				window.location.assign("/cartpage");
			}
			else
				{
				console.log("dint remove item from the cart");
				window.location.assign("/cartpage");
				 
				}
				
		}).error(function(error) {
			console.log("some error in cartpage-angular file")
		});
	
	};
	
	
	$scope.gotohomepage = function() {
		console.log("inside gotohomepage function");
	
	window.location.assign("/homepage");
	};
	
	
	$scope.gotocheckout = function() {
	console.log("inside gotocheckout function");
	
	window.location.assign("/checkout");
	};
	
	
});

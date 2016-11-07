//loading the 'login' angularJS module
var checkoutang = angular.module('checkoutapp', []);
//defining the login controller
checkoutang.controller('checkoutcontroller', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

	$scope.invalid_card=0;	
	$scope.updateaddressdiv=0;
	$scope.updatepaymentdiv=0;
	$scope.my_payment=undefined;
	$scope.addressline1=undefined;
	//$scope.cardno_model=2352443536;
		
	$scope.loadcheckoutpagenow = function() {
	console.log('INVOKED loadcheckoutpagenow');
	$http({
			method : "POST",
			url : '/loadcheckoutpage',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 300) {
				$scope.cartempty=0;
				$scope.cartnotempty=1;
				console.log("recieved 300");
				$scope.shoppingCart=data.itemsInCart;
				console.log('data.itemsInCart is ' + data.itemsInCart);
				
				$scope.jsonString = JSON.stringify(data.itemsInCart);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				console.log("Results Stringify:" + ($scope.jsonString));
				
				console.log("$scope.shoppingCart[0].buyer_uname is " + $scope.shoppingCart[0].buyer_uname); 
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
				$scope.gotocartpage();
				}
				
		}).error(function(error) {
			console.log("some error in cartpage-angular file")
		});
	
	};
	
	$scope.loadcheckoutpagenow();
	
	
	
	$scope.loadaddresspaymentnow = function() {
	console.log('INVOKED loadaddresspaymentnow');
	$http({
			method : "POST",
			url : '/loadaddresspayment',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 300) {
				//$scope.cartempty=0;
				//$scope.cartnotempty=1;
				console.log("recieved 300");
				$scope.addressline1=data.addressline1;
				$scope.addressline2=data.addressline2;
				$scope.addresscity=data.addresscity;
				$scope.addressstate=data.addressstate;
				$scope.addresspin=data.addresspin;

				$scope.my_payment=data.mypayment;
				
				console.log("prince: " + data.addressline1 + ',  ' + data.mypayment);
				if($scope.my_payment!='' && $scope.my_payment!=undefined && $scope.addressline1!='' && $scope.addressline1!=undefined)
				{
					document.getElementById("confirmbtn").disabled = false;
				}
			
			}
			else
				{
				console.log("recieved 301");
				console.log("thiswillneverhappen-loadaddresspayment");
				$scope.cartempty=1;
				$scope.cartnotempty=0;
				$scope.gotocartpage();
				}
				
		}).error(function(error) {
			console.log("some error in cartpage-angular file")
		});
	
	};
	
	$scope.loadaddresspaymentnow();
	
	
	
	$scope.addaddresstodb = function() {
	console.log('INVOKED addaddresstodb() FUNCTION');
	//console.log("cardno is " + $scope.cardno_model +", cvvno is "+ $scope.cvvno_model + ", edate is " + $scope.edate_model);
	if($scope.address1!=undefined && $scope.address3!=undefined && $scope.address4!=undefined && $scope.address5!=undefined)
	{
	$http({
			method : "POST",
			url : '/addaddresstodb',
			data : {
			"address1": $scope.address1,
			"address2": $scope.address2,
			"address3": $scope.address3,
			"address4": $scope.address4,
			"address5": $scope.address5
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				$scope.invalid_card=0;
				console.log("address saved to db");
				window.location.assign("/checkout");
				
				//$scope.addRow();
			}
			else
				{
				$scope.invalid_card=1;
				$scope.errormessage=data.results;
				console.log("some issue storing the address");
				//$scope.loadaddresspaymentnow();
				//window.location.assign("/checkout");
				}
				
		}).error(function(error) {
			console.log("some error in checkout-angular file")
		});
	
	} //end of if
	};
	


		
	
	
	$scope.validatecard = function() {
	console.log('INVOKED validatecard FUNCTION');
	console.log("cardno is " + $scope.cardno_model +", cvvno is "+ $scope.cvvno_model + ", edate is " + $scope.edate_model);
	if($scope.cardno_model!=undefined && $scope.cvvno_model!=undefined && $scope.edate_model!=undefined && $scope.fname_model!=undefined)
	{
	$http({
			method : "POST",
			url : '/validatecard',
			data : {
			"cardno": $scope.cardno_model,
			"cvvno": $scope.cvvno_model,
			"edate": $scope.edate_model,
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				$scope.invalid_card=0;
				console.log("recieved 200 means valid card");
				
				window.location.assign("/checkout");
				
				//$scope.addRow();
			}
			else
				{
				$scope.invalid_card=1;
				$scope.errormessage=data.results;
				console.log("invalid card");
			
				//window.location.assign("/checkout");
				}
				
		}).error(function(error) {
			console.log("some error in checkout-angular file")
		});
	
	} //end of if
	};
	
	
	
	
	
	$scope.updatepayment = function() {
		
		
	$scope.updatepaymentdiv = !($scope.updatepaymentdiv);

	};
	
	$scope.updateaddress = function() {
		
		
	$scope.updateaddressdiv = !($scope.updateaddressdiv);

	};
	
	$scope.gotocartpage = function() {
	console.log("inside gotocartpage function");
	
	window.location.assign("/cartpage");
	};

	
	
	$scope.cancel = function() {
	console.log("inside gotocartpage function");
	
	window.location.assign("/checkout");
	};
	
	
	
	
	$scope.finalcheckout = function() {
	console.log('INVOKED finalcheckout FUNCTION');
	
	$http({
			method : "POST",
			url : '/finalcheckout',
			data : {
			"totalamount": $scope.totalamount,
			"noofitems": $scope.noofitems
		
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				//$scope.invalid_card=0;
				console.log("recieved 200 checkout successful");
				window.location.assign("/successcheckout");
				
				//$scope.addRow();
			}
			else
				{
				//$scope.invalid_card=1;
				console.log("recieved 300 checkout unsuccessful");
				window.location.assign("/failcheckout");
				}
				
		}).error(function(error) {
			console.log("some error in finalcheckout")
		});
	
	}; 
	
	
});


	

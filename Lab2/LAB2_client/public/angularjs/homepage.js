//loading the 'login' angularJS module
var homepageang = angular.module('homepageapp', []);
//defining the login controller
homepageang.controller('homepagecontroller', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

	
	$scope.products=[];
	$scope.biddingsuccessful=false;
	
	/*
	
        $scope.invalid_login = false;
		$scope.unexpected_error = false;
		
		$scope.register_show = false;
		$scope.signin_show = true;
		
		$scope.incomplete_reg = false;
		
		$scope.regdetails_inuse = false;
		
		$scope.try_with_new = false;
        
	
	
	$scope.signinoptions = function() {
	$scope.register_show = false;
	$scope.signin_show = true;
	};

	$scope.registeroptions = function() {
	$scope.register_show = true;
	$scope.signin_show = false;
	};	
	
	
	
	
	$scope.signinsubmit = function() {
	console.log("entered siginsubmit");
	console.log('u is ' + $scope.username_model);
	console.log('pwd is ' + $scope.reg_pwd_model);
	$scope.invalid_login = false;
	if($scope.username_model!=undefined) {
	
	$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username_model,
				"signpassword" : $scope.login_pword_model
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = true;
				$scope.unexpected_error = false;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = true;
			$scope.invalid_login = false;
		});
	}
	
	};*/
	
	
	$scope.load_the_ads = function() {
	console.log('INVOKED load_the_ads FUNCTION-going to fetch all the ads');
	$http({
			method : "POST",
			url : '/gettheads',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("recieved 200");
				//json_responses = {"statusCode" : 200, "data": jsonParse};
				$scope.products=data.product_list;
				$scope.resultlength=data.results_length;
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
				console.log("recieved 201");
				
				}
				
		}).error(function(error) {
			console.log("some error in homepage-angular file")
		});
	
	};
	
	$scope.load_the_ads();
	
	
	
	$scope.addtocart = function(product) {
	//var pquantity = document.getElementById('buyQuantity').value;
	//console.log ("pquantity is " + pquantity);
	console.log ("product.selectQty is " + product.selectQty);	
	if(product.selectQty!=undefined && (product.selectQty)<=(product.product_qty))
	{
	console.log('INVOKED addtocart FUNCTION-going to add the items to the current users cart');
	/*$scope.prodid=pid;
	//$scope.prodqty=pqty;
	$scope.prodprice=pprice;
	$scope.prodname=pname;
	$scope.proddesc=pdesc;
	$scope.prodseller=pseller;*/
	
	
	//console.log($scope.prodid + ', ' + $scope.buyQuantityModel + ', ' + $scope.prodprice + ', ' + $scope.prodname + ', ' + $scope.proddesc + ', ' + $scope.prodseller);
	//console.log("$product.product_qty is: " + product.product_qty);
	
	$http({
			method : "POST",
			url : '/addtocart',
			data : {
			"product_id" : product._id,
			"product_qty" : product.selectQty,
			"product_price" : product.product_price,
			"product_pname" : product.product_name,
			"product_pdesc" : product.product_description,
			"product_seller_email" : product.seller_email,
			"product_seller_uname" : product.seller_uname,
			"product_total_qty" : product.product_qty
	
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 301 || data.statusCode == 302) {
				console.log("recieved " +data.statusCode );
				//$scope.currentCart=data.itemsInCart;
				//console.log('data.itemsInCart is ' + data.itemsInCart);
				
				//$scope.jsonString = JSON.stringify(data.itemsInCart);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				//console.log("Results Stringify:" + ($scope.jsonString));
				
				window.location.assign("/cartpage"); 
				
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
				//console.log("recieved 201");
				
				}
				
		}).error(function(error) {
			console.log("some error in addtocartfunction file")
		});
	
	} //end of if
	
	}; 
	
	
	
	$scope.placebid = function(product) {
	console.log ("product.selectQty is " + product.selectQty);	
	if(product.selectQty!=undefined && (product.selectQty)<=(product.product_qty)  &&  (product.selectPrice)>(product.product_price))
	{
	console.log('INVOKED placebid function');
	console.log('product.bid_start is: ' + product.bid_start + '    product.bid_end is: ' + product.bid_end);
	console.log('difference is: ' + (product.bid_end-product.bid_start));
	/*$scope.prodid=pid;
	//$scope.prodqty=pqty;
	$scope.prodprice=pprice;
	$scope.prodname=pname;
	$scope.proddesc=pdesc;
	$scope.prodseller=pseller;*/
	
	
	//console.log($scope.prodid + ', ' + $scope.buyQuantityModel + ', ' + $scope.prodprice + ', ' + $scope.prodname + ', ' + $scope.proddesc + ', ' + $scope.prodseller);
	//console.log("$product.product_qty is: " + product.product_qty);
	
	$http({
			method : "POST",
			url : '/placebid',
			data : {
			"product_id" : product._id,
			"product_qty" : product.selectQty,
			"product_price" : product.product_price,
			"product_pname" : product.product_name,
			"product_pdesc" : product.product_description,
			"product_seller_email" : product.seller_email,
			"product_bprice": product.selectPrice,
			"bidendtime": product.bid_end
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("BIDDING SUCCESSFUL" );
				
				$scope.currenttimer=data.currenttimer;
				$scope.bidmessage="Bidding Successful; See Bidding history for more details! Bidding ends in ";
				$scope.biddingsuccessful=true;
				$scope.biddingfailed=false;
			}
			else if (data.statusCode == 201) {
				console.log("BIDDING UNSUCCESSFUL; BIDDING TIME OVER" );
				$scope.currenttimer="";
				$scope.bidmessage="BIDDING UNSUCCESSFUL; BIDDING TIME OVER";
				$scope.biddingfailed=true;
				$scope.biddingsuccessful=false;
			}
				
		}).error(function(error) {
			console.log("some error in addtocartfunction file")
		});
	
	} //end of if
	
	};

});

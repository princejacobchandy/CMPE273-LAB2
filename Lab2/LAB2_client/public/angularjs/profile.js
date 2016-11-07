//loading the 'login' angularJS module
var profileang = angular.module('profileapp', []);
//defining the login controller
profileang.controller('profilecontroller', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

	$scope.createanad=false;
	$scope.myads=false;
	$scope.sold_items=false;
	$scope.purchased_items=false;
	
	
	
	$scope.load_profile = function() {
	console.log('INVOKED load_profile FUNCTION-going to fetch all the ads');
	$http({
			method : "POST",
			url : '/getprofile',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("recieved 200");
				//json_responses = {"statusCode" : 200, "data": jsonParse};
				$scope.user=data.user_details[0];
				console.log("$scope.user.fname is: " + $scope.user.fname)
				$scope.jsonString = JSON.stringify(data.user_details);
				console.log("Results Stringify:" + ($scope.jsonString)); 
				
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
	
	$scope.load_profile();
	
	
	$scope.load_my_ads = function() {
	console.log('INVOKED load_the_ads FUNCTION-going to fetch all the ads');
	$http({
			method : "POST",
			url : '/getmyads',
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
				console.log("resultslength is:" + $scope.resultlength);
			}
			else
				{
				console.log("recieved 201");
				
				}
				
		}).error(function(error) {
			console.log("some error in homepage-angular file")
		});
	
	};
	
	$scope.load_my_ads();
	
	
	
	$scope.load_solditems = function() {
	console.log('INVOKED load_soldditems');
	$http({
			method : "POST",
			url : '/getsolditems',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("recieved 200");
				//json_responses = {"statusCode" : 200, "data": jsonParse};
				$scope.soldproducts=data.product_list;
				$scope.soldresultlength=data.results_length;
				//$scope.jsonString = JSON.stringify(data.product_list);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				//console.log("Results Stringify:" + ($scope.jsonString));
				//$scope.places=data.itemsInCart;
				//$scope.places.push($scope.jsonString);
				//$scope.places.push({'value': 'item1'},{'value': 'item2'});
				//console.log('places is ' + $scope.places);
				//console.log('place.value ' + $scope.places);
				//$scope.addRow();
				console.log("resultslength is:" + $scope.resultlength);
			}
			else
				{
				console.log("recieved 201");
				
				}
				
		}).error(function(error) {
			console.log("some error in homepage-angular file")
		});
	
	};
	
	$scope.load_solditems();
	
	
	$scope.load_purchaseditems = function() {
	console.log('INVOKED load_purchaseditems');
	$http({
			method : "POST",
			url : '/getpurchaseditems',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("recieved 200");
				//json_responses = {"statusCode" : 200, "data": jsonParse};
				$scope.purchasedproducts=data.product_list;
				$scope.purchasedresultlength=data.results_length;
				$scope.jsonString = JSON.stringify(data.product_list);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				console.log("purchaseditems_Results Stringify:" + ($scope.jsonString));
				//$scope.places=data.itemsInCart;
				//$scope.places.push($scope.jsonString);
				//$scope.places.push({'value': 'item1'},{'value': 'item2'});
				//console.log('places is ' + $scope.places);
				//console.log('place.value ' + $scope.places);
				//$scope.addRow();
				console.log("resultslength is:" + $scope.resultlength);
			}
			else
				{
				console.log("recieved 201");
				
				}
				
		}).error(function(error) {
			console.log("some error in homepage-angular file")
		});
	
	};
	
	$scope.load_purchaseditems();
	
	
	$scope.load_biditems = function() {
	console.log('INVOKED load_biditems');
	$http({
			method : "POST",
			url : '/getbiditems',
			data : {
			
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("recieved 200");
				//json_responses = {"statusCode" : 200, "data": jsonParse};
				$scope.bidproducts=data.product_list;
				$scope.bidresultlength=data.results_length;
				$scope.jsonString = JSON.stringify(data.product_list);
				//console.log("Results Stringify Type:" + (typeof jsonString));
				console.log("purchaseditems_Results Stringify:" + ($scope.jsonString));
				//$scope.places=data.itemsInCart;
				//$scope.places.push($scope.jsonString);
				//$scope.places.push({'value': 'item1'},{'value': 'item2'});
				//console.log('places is ' + $scope.places);
				//console.log('place.value ' + $scope.places);
				//$scope.addRow();
				console.log("resultslength is:" + $scope.resultlength);
			}
			else
				{
				console.log("recieved 201");
				
				}
				
		}).error(function(error) {
			console.log("some error in homepage-angular file")
		});
	
	};
	
	$scope.load_biditems();	
	
	
	
	$scope.createad = function() {
		
		
	$scope.createanad = !($scope.createanad);

	};
	
	
	
	$scope.displaymyads = function() {
		
		
	$scope.myads = !($scope.myads);

	};
	
	
	
	$scope.solditems = function() {
		
		
	$scope.sold_items = !($scope.sold_items);

	};
	
	
	
	$scope.purchaseditems = function() {
		
		
	$scope.purchased_items = !($scope.purchased_items);

	};
	
	
	$scope.biditems = function() {
		
		
	$scope.bid_items = !($scope.bid_items);

	};
	
	
	
	
	//prodcuttype=2
	$scope.adsubmit = function() {
	console.log("entered adsubmit");
	//console.log('u is ' + $scope.username_model);
	//console.log('pwd is ' + $scope.reg_pwd_model);
	//$scope.invalid_login = false;
	if($scope.Product_title!=undefined && $scope.Product_description!=undefined &&  $scope.Product_price!=undefined &&  $scope.Available_quantity!=undefined) {
	console.log("inside if of adsubmit");
	$http({
			method : "POST",
			url : '/createanad',
			data : {
				"producttype" : 1,
				"productname" : $scope.Product_title,
				"productdesc" : $scope.Product_description,
				"productqty" : $scope.Available_quantity,
				"productprice" : $scope.Product_price
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 201) { //error case
				console.log("some error while trying to create an ad");
				//pop up some error message using ng-show
				//$scope.invalid_login = true;
				//$scope.unexpected_error = false;
			}
			else {
				console.log("successfully created and added the normal ad; refreshing page now");
				window.location.assign("/profile");
				
			}
		}).error(function(error) {
			$scope.unexpected_error = true;
			$scope.invalid_login = false;
		});
	}
	
	};
	
	
	//prodcuttype=2
	$scope.badsubmit = function() {
	console.log("entered badsubmit");
	//console.log('u is ' + $scope.username_model);
	//console.log('pwd is ' + $scope.reg_pwd_model);
	//$scope.invalid_login = false;
	console.log($scope.bProduct_title + ', ' + $scope.bProduct_description + ', ' + $scope.bProduct_price + ', ' + $scope.bAvailable_quantity + ', ' + $scope.bNoofdays + '.........');
	if($scope.bProduct_title!=undefined && $scope.bProduct_description!=undefined &&  $scope.bProduct_price!=undefined &&  $scope.bAvailable_quantity!=undefined && $scope.bNoofdays!=undefined  && $scope.bNoofdays>=0) {
	console.log("inside if");
	$http({
			method : "POST",
			url : '/createanad',
			data : {
				"producttype" : 2,
				"productname" : $scope.bProduct_title,
				"productdesc" : $scope.bProduct_description,
				"productqty" : $scope.bAvailable_quantity,
				"productprice" : $scope.bProduct_price,
				"noofdays" : $scope.bNoofdays
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 201) { //error case
				console.log("some error while trying to create an ad");
				//pop up some error message using ng-show
				//$scope.invalid_login = true;
				//$scope.unexpected_error = false;
			}
			else {
				console.log("successfully created and added the bidding ad; refreshing page now");
				window.location.assign("/profile");
				
			}
		}).error(function(error) {
			$scope.unexpected_error = true;
			$scope.invalid_login = false;
		});
	}
	
	};



	
});

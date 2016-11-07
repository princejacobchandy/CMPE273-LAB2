//loading the 'login' angularJS module
var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false


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
				"password" : $scope.login_pword_model
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
	
	};
	
	
	
	$scope.registersubmit = function() {
	console.log("entered registersubmit");
	//console.log("bday_model is " + $scope.bday_model);
	
	//$scope.bdate=($scope.bmonth_model)+'/'+($scope.bday_model)+'/'+($scope.byear_model);
	console.log('bdate is ' + $scope.bday_model);
	console.log('u is ' + $scope.uname_model);
	console.log('f is ' + $scope.fn_model);
	console.log('l is ' + $scope.ln_model);
	console.log('email is ' + $scope.email_model);
	console.log('pwd is ' + $scope.reg_pwd_model);
	
	if($scope.fn_model!=undefined && $scope.uname_model!=undefined  && $scope.email_model!=undefined) {
		$http({
			method : "POST",
			url : '/registeruser',
			data : {
				"fname" : $scope.fn_model,
				"lname" : $scope.ln_model,
				"uname" : $scope.uname_model,
				"email" : $scope.email_model,
				"regpassword" : $scope.reg_pword_model,
				"bdate" : $scope.bday_model,
				"location" : $scope.location_model,
				"contact" : $scope.contact_model,
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 500) {  //already in use
				console.log("recieved 500");
				$scope.regdetails_inuse = true;
				$scope.try_with_new = false;
			}
			else if (data.statusCode == 501) { //registration successful
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
				console.log("recieved 501");
				//window.location.assign("/");
				
				$scope.regdetails_inuse = false;
				$scope.incomplete_reg = false;
				$scope.try_with_new = false;
				$scope.try_with_new = true;
			}
		}).error(function(error) {
			$scope.unexpected_error = true;
			//$scope.invalid_login = false;
		});
	}
	
	else {
		$scope.incomplete_reg = true;
	};
	
	}
	
});

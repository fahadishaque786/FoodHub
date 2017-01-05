
angular.module('foodHub.controllers', [])

// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $state, $cordovaSQLite, UserService) {
	$scope.aunthorization = {username: '', password: ''};
	$scope.user = {id: null, fullname: '', username: '', email: '', password: '', token: ''};
	
	var authCtrl = this;
	authCtrl.authToken = {username: '', token: ''};
	
	$scope.signIn = function(form){
		if(form.$valid){
			var query = "SELECT * FROM users WHERE username = ? and password = ?";
	        $cordovaSQLite.execute(db, query, [$scope.aunthorization.username, $scope.aunthorization.password]).then(function(res) {
	            if(res.rows.length > 0) {
	            	if(res.rows.item(0).token == null){
		            	UserService.fetchUserToken($scope.aunthorization.username).then(
	         		       function(d) {
	         		    	   console.log(res.rows.item(0).username+' ---- '+res.rows.item(0).token);
	         		    	   authCtrl.authToken = d;
	         		    	   console.log(authCtrl.authToken.token);
	         		    	  
	         		    	   var updateQuery = "UPDATE users SET token = ? WHERE username = ?";
	         		    	   $cordovaSQLite.execute(db, updateQuery, [authCtrl.authToken.token, authCtrl.authToken.username]).then(function(res) {
		         		    		console.log('successfully updated..');
		         		    		console.log('successfully logedin...');
		        	                $state.go('home');
	         		    	   }, function (err) {
		         		            console.error(err.message);
	         		    	   });
	         		       },
	         		       
	         				function(errResponse){
	         		    	   console.error('Error while fetching Currencies');
	         				}
	                 	  );
	            	}else{
	            		console.log('successfully logedin...');
		                $state.go('home');
	            	}
	            } else {
	                alert("No results found");
	                console.log("No results found");
	            }
	        }, function (err) {
	            alert(err);
	            console.error(err);
	        });
		}else{
			console.log("form contains some errors...hahahha....");
		}
	}
	
	$scope.registerNewUser = function(form){
		alert("123");
		if(form.$valid){
			try{
				var query = "INSERT INTO users (fullname, username, email, password) VALUES (?,?,?,?)";
		        $cordovaSQLite.execute(db, query, [$scope.user.fullname, $scope.user.username, $scope.user.email, $scope.user.password]).then(function(res) {
		            var message = "INSERT ID -> " + res.insertId;
		            
		            alert('You have done...');
		            $state.go('login');
		        }, function (err) {
		            console.error(err);
		        });
	        
			}catch(e){
				console.log(e);
			}
		}else{
			alert('Please fix the errors...');
			console.log("form contains some errors...hahahha....");
		}
	};
});
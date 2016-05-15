angular.module('geospatial')
    .factory('Auth', function($resource, $rootScope, $sessionStorage, $q, $http, policies){
     
    /**
     *  User profile resource
     */
    var Profile = $resource('/auth/loggedin', {}, {
        login: {
            method: "GET",
            isArray : false
        }
    });
     
    var auth = {};
     
    /**
     *  Saves the current user in the root scope
     *  Call this in the app run() method
     */
    auth.init = function(){
        if (auth.isLoggedIn()){
            $rootScope.user = auth.currentUser();
        } else {
            $http.get('/auth/loggedin').success(function(user){ 
                console.log('Init: /auth/loggedin: ' + (user ? user.displayname : 'uknown') );
                auth.loggedIn(user);
            });
        }
    };

    auth.loggedIn = function(data) {
        $sessionStorage.user = data;    
        $rootScope.user = $sessionStorage.user;
    };
         
    auth.login = function(username, password){
        return $q(function(resolve, reject){
            //Profile.login({username:username, password:password}).$promise
            Profile.login({username:username, password:password}).$promise
            .then(function(data) {                        
                $sessionStorage.user = data;    
                $rootScope.user = $sessionStorage.user;
                resolve();
            }, function() {
                reject();
            });
        });
    };
     
 
    auth.logout = function() {
        $http.get('/auth/logout').success(function(){ 
            console.log('Bye: /auth/logout');
            delete $sessionStorage.user;
            delete $rootScope.user; 
        });
    };
     
     
    auth.checkPermissionForView = function(view) {
        var route = $sessionStorage.policies[view]

        if (!route.requiresAuthentication) {
            return true;
        }
         
        return auth.userHasPermissionForView(view);
    };
     
     
    auth.userHasPermissionForView = function(view){
        if(!auth.isLoggedIn()){
            return false;
        }
        console.log(view);
        var policy = policies[view];
        if(!policy.permissions || !policy.permissions.length){
            return true;
        }
         
        return auth.userHasPermission(policy.permissions);
    };
     
     
    auth.userHasPermission = function(permissions){
        if(!auth.isLoggedIn()){
            return false;
        }
        
        var found = false;
        if($sessionStorage.user.user_permissions && $sessionStorage.user.user_permissions.length){
            angular.forEach(permissions, function(permission, index){
                if ($sessionStorage.user.user_permissions.indexOf(permission) >= 0){
                    console.log('User with role: ' + permission);
                    found = true;
                    return;
                }                        
            });
        }

        return found;
    };
     
     
    auth.currentUser = function(){
        return $sessionStorage.user;
    };
     
     
    auth.isLoggedIn = function(){
        return $sessionStorage.user != null;
    };

    auth.setPolicies = function(policies) {
        $sessionStorage.policies = policies;
    }
     
    return auth;
});
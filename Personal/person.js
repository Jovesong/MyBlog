/**
 * Created by Administrator on 2016/10/17.
 */
(function(){
    var personModule = angular.module("MyBlog.personModule",[]);
    //≈‰÷√¬∑”…
    personModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/person',{
                templateUrl:'Personal/person.html',
                controller:"personController"
            });
    }]);

    personModule.controller('personController',['$scope','$rootScope','$routeParams',function($scope,$rootScope,$routeParams){
        $rootScope.category = 'person';
    }]);
})()
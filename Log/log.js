/**
 * Created by Administrator on 2016/10/17.
 */


(function(){
    var logModule = angular.module("MyBlog.logModule",[]);
    //配置路由
    logModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/log',{
                templateUrl:'Log/log.html',
                controller:"logController"
            });
    }]);

    logModule.controller('logController',['$scope','$rootScope','$routeParams',function($scope,$rootScope,$routeParams){
        $rootScope.category = 'log';
    }]);
})()
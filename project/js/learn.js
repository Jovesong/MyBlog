/**
 * Created by Administrator on 2016/10/31.
 */
(function(){
    var learnModule = angular.module("MyBlog.learnModule",[]);
    //≈‰÷√¬∑”…
    learnModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/learn',{
                templateUrl:'project/index.html',
                controller:"learnController"
            });
    }]);

    //øÿ÷∆∆˜
    learnModule.controller('learnController',['$scope','$rootScope',function($scope,$rootScope){
        $rootScope.category = 'learn';

    }]);
})()
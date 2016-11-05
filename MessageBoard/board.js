/**
 * Created by Administrator on 2016/10/17.
 */
(function(){
    var boardModule = angular.module("MyBlog.boardModule",[]);
    //配置路由
    boardModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/board',{
                templateUrl:'MessageBoard/board.html',
                controller:"boardController"
            });
    }]);

    boardModule.controller('boardController',['$scope','$rootScope','$routeParams',function($scope,$rootScope,$routeParams){
        $rootScope.category = 'board';
    }]);
})()
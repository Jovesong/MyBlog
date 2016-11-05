/**
 * Created by Administrator on 2016/9/29.
 */
(function(){
    var DetailModule = angular.module('doubanApp.DetailModule',[]);
    DetailModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/movie/detail/:id',{
                templateUrl:'Movie/detail.html',
                controller:'DetailController'
            })
    }]);
    DetailModule.controller("DetailController",['$scope','$routeParams','JsonpService','$rootScope','appConstant',
        function($scope,$routeParams,JsonpService,$rootScope,appConstant){
            $rootScope.category = 'movie';
            $scope.show = false;
            JsonpService.jsonp(appConstant.detailUrl+$routeParams.id,{},function(res){
                $scope.show = true;
                //console.log(typeof (res));
                $scope.movies = res;
                res.summary = res.summary.replace(/\n/g,'');
                res.summary = res.summary.replace(/©豆瓣/g,'');

                $scope.summary = res.summary;
                //console.log($scope.summary);

                //刷新数据
                $scope.$apply();

            });
    }]);
})()
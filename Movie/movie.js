/**
 * Created by Administrator on 2016/10/17.
 */


(function(){
    var movieModule = angular.module("MyBlog.movieModule",[]);
    //配置路由
    movieModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/movie',{
                templateUrl:'Movie/movie.html',
                controller:"movieController"
            }).
            when('/movie/:list/:page?',{
                templateUrl:'Movie/movie.html',
                controller:"movieController"
            });
    }]);

    movieModule.controller('movieController',['$scope','$rootScope','$routeParams','JsonpService','appConstant',"$route",
        function($scope,$rootScope,$routeParams,JsonpService,appConstant,$route){
               $rootScope.category = 'movie';
                //每页要显示的条数
                var count = appConstant.count;

                var currentPage = ($routeParams.page>0 ?parseInt($routeParams.page) : 1) || 1;
                $scope.currentPage = currentPage;

                //要显示的页面
                var start = (currentPage - 1) * count;
                $routeParams.list = $routeParams.list ? $routeParams.list : "in_theaters";
                console.log(appConstant.ListUrl+$routeParams.list);

                //跨域请求数据
                JsonpService.jsonp(appConstant.ListUrl+$routeParams.list, { count: count, start: start,q:$rootScope.input },
                    function(res) {
                        //console.log(res);
                        //得到请求数据
                        $scope.subjects = res.subjects;

                        //数据的总条数
                        $scope.total = res.total;
                        //标题
                        $scope.title = res.title;
                        //共有几页
                        $scope.totalPage = Math.ceil(res.total / count);

                        //配置分页控件,数据请求完毕后,pageConfig才有值
                        $scope.pageConfig = {total:$scope.totalPage,current:currentPage,show:10,click:function(index){
                            //点击按钮改变路由
                            $route.updateParams({page:index});
                        }};

                        //数据请求完成后,清除输入框的数据
                        $rootScope.input="";
                        // 告诉 angular 刷新界面上的数据
                        $scope.$apply();
                    });
    }]);
})()
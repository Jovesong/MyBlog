/**
 * Created by Administrator on 2016/10/17.
 */
(function(){
    var homeModule = angular.module("MyBlog.homeModule",[]);
    //配置路由
    homeModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/home',{
                templateUrl:'HomePage/home.html',
                controller:"HomeController"
            });
    }]);

    //控制器
    homeModule.controller('HomeController',['$scope','$rootScope',function($scope,$rootScope){
        $rootScope.category = 'home';
        $scope.imgs=['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg'];
        $scope.sentence = ['知人者智，自知者明。','胜人者有力，自胜者强。','——老子'];
        $scope.url = null;
        //音频audio
        var audio = document.getElementById("fr").contentWindow.document.getElementById("audio");

        //播放音乐
        $scope.play = function(url){
            audio.src= url;
            audio.play();
        }

        //暂停音乐
        $scope.pause = function(){
            audio.pause();
        }
    }]);
})()
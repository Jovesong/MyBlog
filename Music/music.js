/**
 * Created by Administrator on 2016/10/17.
 */


(function(){
    var musicModule = angular.module("MyBlog.musicModule",[]);
    //配置路由
    musicModule.config(["$routeProvider",function($routeProvider){
        $routeProvider.
            when('/music',{
                templateUrl:'Music/music.html',
                controller:"musicController"
            });
    }]);

    musicModule.controller('musicController',['$scope','$rootScope','$routeParams','JsonpService','$interval','appConstant',
        function($scope,$rootScope,$routeParams,JsonpService,$interval,appConstant){

            $rootScope.category = 'music';
            //初始化类型
            $scope.name  = "漫步春天";


            //音频
            var audio = document.getElementById("fr").contentWindow.document.getElementById("audio");
            //判断播放还是暂停 0 暂停 1播放
            var flag = 0;
            audio.currentTime = 0;
            //自动播放
            jsonp();
            //换台,之后请求数据
            $scope.change = function(){
                $(".music-content").animate({ marginLeft: "-1000px"},'slow',function(){
                    JsonpService.jsonp(appConstant.channelUrl,{},function(res){
                        //console.log(res.channels);
                        $scope.channels = res.channels;
                        // 告诉 angular 刷新界面上的数据
                        $scope.$apply();
                    })
                });
            }

            //返回
            $scope.back = function(){
                $(".music-content").animate({ marginLeft: "0px"},'slow');
            }

            //选择音乐种类
            $scope.select = function(channels){
                var id  = channels.channel_id;
                $scope.name = channels.name;
                //改变选择的透明度,移除其他透明度,移除其他类check
                $('#'+id).css({'background':'rgba(0,0,0,0.5)'}).siblings().css({'background':'rgba(0,0,0,0.15)'}).find('span').removeClass('check');

                //选择加上类check
                $('#'+id + ">span").addClass('check');

                //请求歌曲数据
                jsonp(id);

            }

            //点击播放
            $scope.play = function(url){

             //flag为0,播放歌曲,flag为1,暂停播放歌曲,改变样式
             if(flag == 0){
                 $('.item-play span').removeClass('glyphicon-play').addClass('glyphicon-pause');
                 $('#picture').css({'background':'rgba(0,0,0,0)'}).text('');
                 audio.play();
                 flag = 1;
             }else if(flag == 1){
                 $('.item-play span').removeClass('glyphicon-pause').addClass('glyphicon-play');
                 $('#picture').css({'background':'rgba(0,0,0,0.4)'}).text('点击播放');
                 audio.pause();
                 flag = 0;
             }
            }
            //播放
            function listen(url){
                $('.item-play span').removeClass('glyphicon-play').addClass('glyphicon-pause');
                audio.src = url;
                audio.play();
            }
            //下一首
            $scope.next = function(id){
                jsonp(id);
            }


            //播放条

            $interval(function(){
                var width = audio.currentTime * $('.song-progress').width() / audio.duration ;
                $('.progress-time').width(width);
                Time($(".play-time"),audio.currentTime);
                Time($('.total-time'),audio.duration);
                if(audio.currentTime == audio.duration){
                    jsonp($scope.id);
                }
                lrcMove(audio.currentTime);
            },1000);

            //请求歌曲数据
            function jsonp(id){
                //id没有值给他一个默认的值
                if(!id){
                   id = 'public_tuijian_spring'
                }
                if(audio.currentTime){
                    audio.currentTime = 0;
                }
                $scope.id = id;
                JsonpService.jsonp(appConstant.songUrl,{channel:id},function(data){
                    console.log(data.song[0]);
                    $scope.music =data.song[0];
                    //歌曲地址
                    $scope.url = data.song[0].url;
                    //播放
                    listen(data.song[0].url);
                    flag  =  1;
                    //调用函数getLrc,得到歌词
                    getLrc(data.song[0].sid);

                    // 告诉 angular 刷新界面上的数据
                    $scope.$apply();
                })
            }

            //请求歌词,并随歌曲而动
            function getLrc(sid){
                $.ajax({
                    url: appConstant.lrcUrl,
                    dataType: "json",
                    data: {
                        sid: sid
                    },
                    success: function(data) {
                         //console.log(data);
                        readLrc(data.lyric);

                    }
                })

            }

            //解析歌词
            function  readLrc(lrc) {
                $(".lrc").empty();
                var reg1 = /\[\d\d\:\d\d(\.|\:)\d\d\]/g,   //去掉歌曲前面的时间
                    reg2 = /\[\w+\:/g,   //去掉[]
                    reg3 = /\]/g,
                    ul = "<ul>",
                    mm, ss;
                lrcArr = lrc.split("\n");
                for (var i = 0; i < lrcArr.length; i++) {
                    mm = parseInt(lrcArr[i].slice(1, 3));
                    ss = parseInt(lrcArr[i].slice(4, 6));
                    if (isNaN(mm)) {
                        continue;
                    }
                    lrcArr[i] = lrcArr[i].replace(reg1, "");
                    lrcArr[i] = lrcArr[i].replace(reg2, "");
                    lrcArr[i] = lrcArr[i].replace(reg3, "");
                    ul += '<li data-lrcs="' + (mm * 60 + ss) + '">' + lrcArr[i] + '</li>';
                }
                ul += "</ul>";
                $(".lrc").append(ul);
            }

            //歌词运动
             function lrcMove(currentTime) {
                $(".lrc ul li").each(function(index, el) {
                    var self = $(this);
                    //总时间
                    var time = Math.floor(audio.duration);
                    //当前歌曲播放的时间等于某一行的时间,移除所有选中的类check,给这行加类check
                    if (Math.floor(currentTime) == $(this).attr("data-lrcs")) {
                        if($(this).text()){
                            $(".lrc ul li").removeClass('check');
                            $(this).addClass("check");
                        }
                        //前6行和后
                        if ($(this).index() >= 3 && (time - Math.floor(currentTime)) > 15) {
                            $(".lrc ul").animate({ marginTop: -$(".lrc ul li").height() * (self.index() - 3) });
                        }
                    }
                });
            }
            //关闭声音noVoice
            $scope.noVoice = function(){
                console.log(audio.muted);
                if(!audio.muted){
                    $('.voice').removeClass('glyphicon-volume-down').addClass('glyphicon-volume-off');
                    audio.muted = true;
                }else{
                    $('.voice').removeClass('glyphicon-volume-off').addClass('glyphicon-volume-down');
                    audio.muted = false;
                }
            }

            //调整时间voice
            $scope.voice = function(e){
                audio.muted = false;
                $('.voice').removeClass('glyphicon-volume-off').addClass('glyphicon-volume-down');
                e = e || window.event;
                //点击的长度
                var currentLeft  =  e.clientX  - $('#voi')[0].offsetLeft - $('.content')[0].offsetLeft -
                    $('.music')[0].offsetLeft - $('.play')[0].offsetLeft ;
                var voice = currentLeft / $('#voi').width();
                audio.volume = voice;
                $('.progress-times').width(currentLeft);
                //点击长度为0是改变样式
                if(currentLeft == 0){
                    $('.voice').removeClass('glyphicon-volume-down').addClass('glyphicon-volume-off');
                    audio.muted = true;
                }
            }
            //计算时间
            function Time(dom,time){
                var mm = Math.floor(time / 60);
                mm = mm < 10 ? "0" + mm : mm;
                var ss = Math.floor(time % 60);
                ss = ss < 10 ? "0" + ss : ss;
                dom.text(mm + ":" + ss)
            }
    }]);

})()
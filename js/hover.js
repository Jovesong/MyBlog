/**
 * Created by Administrator on 2016/10/17.
 */
$(function(){

    function Time(){
        var banners = $('#bannerContent>li>a>img');
        var hover = $('#hover');
        var Btn  = $('#switchBtn>li');
        var  index = 0;
        $(banners[0]).css("zIndex",100);
        $.each(Btn,function(k,v){
            $(v).bind({
                click:function(){
                    Change(k);
                    index =  k % Btn.length * 60;
                    hover.animate({marginTop:index});
                }
            })
        });

        var timer = setInterval(function(){
            index += 60;
            if(index >= Btn.length*60){
                index = 0;
            }
            Change(index / 60);
            hover.animate({marginTop:index});
        },3000);

        function Change(index){
            $.each(banners,function(key,values){
                $(banners[key]).css({"zIndex":2,'opacity':0.5});
            });
            $(banners[index]).css("zIndex",100).animate({opacity:1},'slow');

        }
        return timer;
    }

    var flag = 0;
    setInterval(function(){
        if($('#hover').length == 1){
            if(flag == 0){
                Time();
                flag = 1;
            }
        }else{
            clearInterval(Time());
            flag = 0;
        }
    },1000);



});


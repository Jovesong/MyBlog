$(function(){function t(t){function n(t,n,e){for(var a=new Date(t,n,e);a.getMonth()!=n;)a=new Date(t,n,e),e--;return a.getDate()}var e=t.getFullYear(),a=t.getMonth(),r=t.getDate(),i=(t.getDay(),"<caption><h4>"+e+"年"+(a+1)+"月</h4></caption>"),o=n(e,a,31),c=new Date(e,a,1).getDay()-"0";i+="<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr><tr>",i+='<td colspan="'+c+'"></td>';for(var h=1;h<o;h++)i+=(new Date(e,a,h).getDay()+1)%7==0?h==r?'<td class="bg-info">'+h+"</td></tr><tr>":"<td>"+h+"</td></tr><tr>":h==r?'<td class="bg-info">'+h+"</td>":"<td>"+h+"</td>";i+="</tr>";setInterval(function(){$(".tab").html(i)},1e3)}var n=new Date;t(n)}),$(function(){function t(){function t(t){$.each(n,function(t,e){$(n[t]).css({zIndex:2,opacity:.5})}),$(n[t]).css("zIndex",100).animate({opacity:1},"slow")}var n=$("#bannerContent>li>a>img"),e=$("#hover"),a=$("#switchBtn>li"),r=0;$(n[0]).css("zIndex",100),$.each(a,function(n,i){$(i).bind({click:function(){t(n),r=n%a.length*60,e.animate({marginTop:r})}})});var i=setInterval(function(){r+=60,r>=60*a.length&&(r=0),t(r/60),e.animate({marginTop:r})},3e3);return i}var n=0;setInterval(function(){1==$("#hover").length?0==n&&(t(),n=1):(clearInterval(t()),n=0)},1e3)});
/**
 * Created by Administrator on 2016/10/21.
 */

$(function(){
    var d1 = new Date();  // 获取当前系统时间
    Dates(d1);
    function Dates(d1){
        var year = d1.getFullYear();    // 获取年信息， 2016
        var month = d1.getMonth();      // 获取月信息（从0开始 范围：0-11）
        var date =  d1.getDate();      // 获取天信息
        var day1 = d1.getDay();      // 获取星期信息 （0-6）

        //获取当月的总天数
        function GetDays(year,month,date){
            var d = new Date(year,month,date);
            while(d.getMonth() != month){
                d = new Date(year,month,date);
                date--;
            }
            return d.getDate();
        }
        var str = "<caption><h4>"+year+'年'+ (month+1) +'月' +"</h4></caption>";
        var days = GetDays(year,month,31);
        var day2 = new Date(year,month,1).getDay() - '0';
        var index = 1;
        str +='<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr><tr>';

            str += '<td colspan="'+ day2+'"></td>';
        for(var i = 1; i <days ; i++ ){
            if((new Date(year,month,i).getDay() + 1) % 7 == 0){
                if(i == date){
                    str += '<td class="bg-info">'+ i + '</td></tr><tr>';
                }else{
                    str += '<td>'+ i + '</td></tr><tr>';
                }

            }else{
                if(i == date){
                    str += '<td class="bg-info">'+ i +'</td>';
                }else{
                    str += '<td>'+ i +'</td>';
                }
            }
        }
        str += '</tr>';
        var dateTime = setInterval(function(){
            $('.tab').html(str);
        },1000);
    }
})
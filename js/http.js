/**
 * Created by Administrator on 2016/9/28.
 */
(function(){
    var HttpModule = angular.module('doubanApp.httpModule',[]);
    HttpModule.service('JsonpService',['$window',function($window){
        this.jsonp = function jsonp(url,params,fn){

            var queryString = "?"
            for(key in params){
                queryString += key + '=' + params[key] + "&&";
            }

            var fnName = 'Myjsonp_' + new  Date().getTime();
             queryString  += 'callback=' + fnName;
            $window[fnName] = function(res){
                fn(res);
                //移除script标签
                $window.document.body.removeChild(script);
            }
            var script = $window.document.createElement("script");
            script.src = url +  queryString;
            $window.document.body.appendChild(script);

        }
    }])
})()
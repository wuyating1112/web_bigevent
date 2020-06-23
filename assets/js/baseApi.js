// ajaxPrefilter(function (options)方法是jQuery中提供的，当我们发起get、post、ajax请求时都先会自动调用这个方法，可以帮我们获得我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 拼接URL地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);


})
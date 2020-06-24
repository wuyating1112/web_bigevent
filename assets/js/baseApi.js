// ajaxPrefilter(function (options)方法是jQuery中提供的，当我们发起get、post、ajax请求时都先会自动调用这个方法，可以帮我们获得我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 拼接URL地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);

    // 统一为有权限接口设置headers请求头
    if (options.url.indexOf(/my/) !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    // 全局统一挂载complete函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //   强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html';
        }
    }

})
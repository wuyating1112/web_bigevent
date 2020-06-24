$(function() {
        // 调用函数获取用户信息
        getUserInfo();
        // 点击按钮实现退出功能
        var layer = layui.layer;
        $('#btnLogout').on('click', function() {
            // console.log('ok');

            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 清空本地存储的token
                localStorage.removeItem('token');
                // 重新跳转到登录页面
                location.href = '/login.html';
                // 关闭confirm询问框
                layer.close(index);
            });
        })

    })
    // 封装一个获取用户信息的函数
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);

            // 判断获取用户信息是否成功
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            // 调用renderAvatar函数渲染用户信息头像
            renderAvatar(res.data);


        },
        // 不论请求是否成功，都会调用complete这个函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //   强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }

    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }

}
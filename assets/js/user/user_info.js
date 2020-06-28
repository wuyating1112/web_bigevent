$(function() {
    var form = layui.form;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个之间！'
            }
        }
    });

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 给重置按钮绑定点击事件
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo();

        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！');
                // 调用当前窗口的父页面下的方法,重新渲染用户头像和用户的信息
                window.parent.getUserInfo()
            }
        })

    })
})
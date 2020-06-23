$(function() {
    // 点击去注册账号的链接
    $('#link-reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击去登录的链接
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过from.verify()函数自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                // 通过形参拿到色是确认密码框中的值，我们让形参和密码框中的值做判断，若不相等则返回一个提示信息两次输入不一致
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码输入不一致'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
            // 阻止默认表单按钮提交事件
            e.preventDefault();
            var data = { username: $('#form-reg [name = username]').val(), password: $('#form-reg [name = password]').val() };
            // 发送注册post请求
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                $('#link-login').click();

            })
        })
        // 监听登录表单的提交事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                layer.msg('登陆成功！');
                // 登录成功后在本地存储保存请求头
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})
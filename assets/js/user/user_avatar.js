$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function() {
        $('.file').click();
    })
    $('.file').on('change', function(e) {
        // console.log(e);
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layui.layer.msg('请上传头像！')
        }
        // 如果用户选择了图片，声明file拿到用户选择的文件
        var file = e.target.files[0];
        // 根据选择的文件创建一个图片的URL地址
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域


    })
    $('#btnUpload').on('click', function() {
        // 1.要拿到用户裁剪后的头像

        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 2.调用接口把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('头像上传失败！')
                }
                layui.layer.msg('头像上传成功！')
                window.parent.getUserInfo();
            }


        })

    })
})
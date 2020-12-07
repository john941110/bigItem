$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return "昵称长度必须在1~6位字符之间！"
        }
    });

    Initinfo()
    //获取信息
    function Initinfo(){
        $.get('/my/userinfo',function(res){
            if(res.status !== 0) return layer.msg('获取用户信息失败！')
            form.val('filter', res.data)
        })
    }
    //重置功能
    $('#resetBtn').on('click',function(e){
        e.preventDefault();
        Initinfo()
    })

    //提交更新
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.post('/my/userinfo',$(this).serialize(),function(res){
            if(res.status !== 0) return layer.msg('用户信息更新失败！')
            layer.msg('用户信息更新成功！')
            window.parent.Getuserinfo()
        }) 
    })

        
    
})
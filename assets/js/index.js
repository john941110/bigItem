$(function(){
    Getuserinfo()

//退出功能
    $('#escBtn').on('click',function(){
        layui.layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //本地删除token证书
            localStorage.removeItem('token')
            //跳转至login页面
            location.href = 'login.html'

            layer.close(index);
          });
    })


})

//获取用户信息
function Getuserinfo(){
$.get('/my/userinfo',function(res){
    if(res.status !== 0) return layui.layer.msg('获取用户信息失败！')
    Render(res.data)
})
}

//渲染信息
function Render(user){
    //设置名字
    let uname = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;'+uname)
    //设置头像
    if(user.user_pic){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-img').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-img').html(uname[0].toUpperCase()).show()
    }
}
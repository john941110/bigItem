$(function(){
    // 给登录注册标签添加点击事件
    $('#link_reg').on('click' , function(){
        $('.login-box').stop().hide()
        $('.reg-box').stop().show()
    })
    $('#link_login').on('click' , function(){
        $('.reg-box').stop().hide()
        $('.login-box').stop().show()
    })


    // 给表单添加正则验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repass:function(value){
          if(value !== $('#form_reg #password').val()){
            return '两次密码不一致！'
          }
        }
        
      });      
      
      $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.post('/api/reguser',
        {
          username:$('#form_reg #uname').val(),
          password:$('#form_reg #password').val()
        },
        function(res){
          if(res.status !== 0 ){
            return layer.msg(res.message);
          }
          layer.msg(res.message)
          $('#link_login').click()
        })
      })

      $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.post('/api/login',
        {
          username:$('#form_login #uname').val(),
          password:$(' #form_login #password').val()
        },
        function(res){
          if(res.status !== 0){
            return layer.msg(res.message);
          }
          layer.msg(res.message)
          // 将登录成功得到的 token 字符串，保存到 localStorage 中
          localStorage.setItem('token', res.token)
          location.href = '/index.html'
        })
      })
})
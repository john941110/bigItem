$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        spass:function(value){
          if(value === $('.oldPwd').val()) return '新旧密码不能相同！'
        },
        repass:function(value){
          if(value !== $('.newPwd').val()) return '两次密码不一致！'
        }
      });     
      
      $('.layui-form').on('submit',function(e){
        e.preventDefault();
          $.post('/my/updatepwd',$(this).serialize(),function(res){
              if(res.status !== 0) return layer.msg('密码修改失败！')
              return layer.msg('密码修改成功！')
          })
          $('#resetBtn').click()
      })
})
$(function(){
    $.ajaxPrefilter(function(options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        //统一为有权限的接口设置`headers`请求头
        if(options.url.includes('/my/')){
          options.headers = {
            Authorization:localStorage.getItem('token') || ''
          }
        }
        //控制用户的访问权限
        options.complete = function(res) {
          console.log(res);
          // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
          if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
          }
        }
      })
})
$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }
  function Getlist() {
    $.get('/my/article/list', q, function (res) {
      if (res.status !== 0) return layer.msg(res.message);
      var htmlStr = template('tpl-table', res)
      $('tbody').html(htmlStr)
      renderPage(res.total)
      curretData = res.data
    })
  }

  Getlist()
  Initcate()
  function Initcate() {
    $.get('/my/article/cates', function (res) {
      if (res.status !== 0) return layer.msg(res.message);
      var htmlStr = template('tpl-cate', res)
      $('#cate_id').html(htmlStr)
      form.render()
    })
  }

  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    // 获取表单中选中项的值
    var cate_id = $('#cate_id').val()
    var state = $('#state').val()
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id
    q.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    Getlist()

  })

  function renderPage(total) {
    laypage.render({
      elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
      , count: total //数据总数，从服务端得到
      , limit: q.pagesize // 每页显示几条数据
      , curr: q.pagenum // 设置默认被选中的分页
      , limits: [2, 3, 5, 10]
      , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
      , jump: function (obj, first) {
        // 把最新的页码值，赋值到 q 这个查询参数对象中
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          Getlist()
        }
      }
    });
  }

  $('tbody').on('click','#dltBtn',function(){
    var len = $('#dltBtn').length
    var id = $('#dltBtn').attr('data-id')
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.get('/my/article/delete/'+ id ,function(res){
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        if (curretData.length === 1) {
          // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
          // 页码值最小必须是 1
          q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
        }
        Getlist()
      })
      layer.close(index);
    });     
      
  })
})



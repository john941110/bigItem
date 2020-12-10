$(function () {

    Getarticle()
})
var form = layui.form
var layer = layui.layer

// 获取数据  通过template插件渲染
function Getarticle() {
    $.get('/my/article/cates', function (res) {
        if (res.status !== 0) return layer.msg('数据请求失败！');
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
    })
}
// 点击添加按钮，跳出添加弹窗
$('#addBtn').on('click',function(){
    layer.open({
        type:1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
      });     
        
})
// 监听添加表单的提交事件，将表单的数据提交到后台，并从新渲染到页面
$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.post('/my/article/addcates',$(this).serialize(),function(res){
        if(res.status !== 0 ) return layer.msg('新增文章分类失败！');
        Getarticle()
        layer.msg('新增文章分类成功！')
        layer.closeAll()
    })
})
// 点击编辑按钮，跳出编辑弹框
$('tbody').on('click','#makeBtn',function(){
    layer.open({
        type:1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-make').html()
      });
    //   给编辑表单赋值 
    //获取编辑按钮的data-id自定义属性的值
    var id = $(this).attr('data-id')
    $.get('/my/article/cates/' + id,function(res) {
        form.val('form-make', res.data)
      })
})
// 监听编辑表单的提交事件，将表单的数据提交到后台，并从新渲染到页面
$('body').on('submit','#form-make',function(e){
    e.preventDefault()
    $.post('/my/article/updatecate',$(this).serialize(),function(res){
        if(res.status !== 0 ) return layer.msg('更新分类数据失败！');
        layer.msg('更新分类数据成功！')
        layer.closeAll()
        Getarticle()
    })
})
// 点击删除按钮，跳出弹框
$('tbody').on('click','#delBtn',function(){
    //获取编辑按钮的data-id自定义属性的值
    var id = $(this).attr('data-id')
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        //调用删除数据接口，从新渲染页面
        $.get('/my/article/deletecate/' + id ,function(res){
            if(res.status !== 0 ) return layer.msg('删除分类失败');
            layer.msg('删除分类成功')
            Getarticle()
            layer.close(index);
        })
      });
})
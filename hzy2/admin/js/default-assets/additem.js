$("#sccaipin").fileinput(
    {
        language: 'zh',
        uploadUrl: 'http://127.0.0.1:25564/item/add',
        allowedFileExtensions : ['jpg'],
        uploadExtraData : function() {  //传递参数
            var data={
                name:$("#cname").val(),
                cate:$("#cate").val(),
                price:$("#cprice").val(),
                des:$("#cdes").val()
                };
                return data; 
     },
        maxFileCount: 1,
        enctype: 'multipart/form-data',
    }
).on("fileuploaded", function(event, data){//上传成功事件
        if(data.response.status == "success"){
            alert("添加成功");
        }
        else{
            alert("状态:"+data.response.status)
        }
});
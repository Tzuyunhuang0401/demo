var uuid=getQueryVariable("uuid")
if(uuid ==''|uuid ==null){
    uuid=localStorage.getItem("uuid")
}
console.log(uuid)
$("#touxiang").fileinput(
    {
        language: 'zh',
        uploadUrl: 'http://127.0.0.1:25564/userinfo/img',
        allowedFileExtensions : ['jpg'],
        uploadExtraData : function() {  //传递参数
            var data={
                uuid:uuid,
                };
                return data; 
     },
        maxFileCount: 1,
        enctype: 'multipart/form-data',
    }
).on("fileuploaded", function(event, data){//上传成功事件
        if(data.response.status == "success"){
            alert("上传头像成功");
            window.location.reload()
        }
        else{
            alert("状态:"+data.response.status)
        }
});
$.post("http://127.0.0.1:25564/userinfo/get",
    {
        uuid:uuid,
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data)
            $("#pname").val(datas.name)
            $("#email").val(datas.email)
            $("#phone").val(datas.phone)
            $("#address").val(datas.address)
        }
        else{
            alert(datas.status)
        }
    });
function changeprofile(element){
    $.post("http://127.0.0.1:25564/userinfo/change",
{
    uuid:uuid,
    name:$("#pname").val(),
    email:$("#email").val(),
    address:$("#address").val(),
    phone:$("#phone").val(),
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        alert("更改个人信息成功")
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
};
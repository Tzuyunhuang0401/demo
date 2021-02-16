function addyh(element){
    $.post("http://127.0.0.1:25564/user/add",
{
    username:$("#name").val(),
    password:$("#passsword").val(),
    role:$("#role").val(),
    question:$("#question").val(),
    answer:$("#answer").val()
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        alert("添加成功")
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
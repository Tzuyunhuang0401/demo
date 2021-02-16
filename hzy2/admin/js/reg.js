function reg(element){
    $.post("http://127.0.0.1:25564/user/add",
{
    username:$("#username").val(),
    password:$("#password").val(),
    question:$("#question").val(),
    answer:$("#answer").val(),
    role:'顾客'
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        window.location.href='login.html';
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
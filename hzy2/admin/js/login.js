function login(element){
    $.post("http://127.0.0.1:25564/user/login",
{
    username:$("#username").val(),
    password:$("#password").val(),
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        var role=datas.role;
        localStorage.setItem("role",role);
        localStorage.setItem("uuid",datas.uuid);
        window.location.href='../index.html?role='+role+'&uuid='+datas.uuid;
        $.post("http://127.0.0.1:25564/shopping/get",
        {
            uuid:datas.uuid,
        },
        function(data,status){
            var datas=JSON.parse(data);
            if(datas.status == "success"){
                console.log(data);
                localStorage.setItem("shoppingitem",datas.shoppingitem)
                localStorage.setItem("money",datas.money)
            }
            else{
                console.log("状态:"+datas.status)
                localStorage.setItem("shoppingitem","")
                localStorage.setItem("money","")
            }
        });
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
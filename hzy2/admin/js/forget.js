function  check() {
    $.post("http://127.0.0.1:25564/user/check",
        {
            username:$("#username").val(),
            password:$("#password").val(),
            question:$("#question").val(),
            answer:$("#answer").val()
        },
        function(data,status){
            var datas=JSON.parse(data);
            if(datas.status == "success"){
                alert("密码修改成功！")
                window.location.href='login.html'
            }
            else{
                alert(datas.status)
            }
        });
}
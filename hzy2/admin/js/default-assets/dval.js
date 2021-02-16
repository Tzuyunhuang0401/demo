var uuid=localStorage.getItem("uuid")
var role=localStorage.getItem("role")
if(uuid ==null |uuid==''){
    alert("你未登录！")
    window.location.href="login.html"
}
if(role =='顾客'){
    $("#manage").remove()
}
$("#bigava").attr("src","../assets/images/"+uuid+".jpg")
$("#shotava").attr("src","../assets/images/"+uuid+".jpg")
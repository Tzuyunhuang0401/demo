var uuid=localStorage.getItem("uuid")
var role=localStorage.getItem("role")
if(uuid ==null |uuid==''){
    alert("你未登录！")
    window.location.href="admin/login.html"
}
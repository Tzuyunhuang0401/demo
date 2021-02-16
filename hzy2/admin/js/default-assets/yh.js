$.post("http://127.0.0.1:25564/user/get",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setorder(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
function setorder(data){
    var json=eval(data)
    $("#orderbox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>
            ${json[i].uuid}
        </td>
        <td>
        ${json[i].username}
        </td>
        <td>
            <div class="product-en-btn">
                <a class="badge badge-success-lighten">${json[i].role}</a>
            </div>
        </td>
        <td>
            <a class="action-icon" onclick="removeuser(this)" uuid="${json[i].uuid}"> <i class="zmdi zmdi-delete"></i></a>
            <a href="profile.html?uuid=${json[i].uuid}" class="action-icon"> <i class="fa fa-mail-forward"></i></a>
        </td>
    </tr>`
        $("#orderbox tbody").append(str)
    }
}
function removeuser(element){
    var uuid=$(element).attr("uuid")
    $.post("http://127.0.0.1:25564/user/remove",
{
    uuid:uuid
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        alert("删除成功")
    }
    else{
        alert("状态:"+datas.status)
    }
});
$(element).parent().parent().remove()
}

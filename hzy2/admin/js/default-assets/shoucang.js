var uuid=localStorage.getItem("uuid");
$.post("http://127.0.0.1:25564/shoucang/get",
{
    uuid:uuid,
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
            ${json[i].name}
        </td>
        <td>
        ${json[i].des}
        </td>
        <td>
        ${json[i].price}元
        </td>
        <td>
            <div class="product-en-btn">
                <a class="badge badge-success-lighten">${json[i].cate}</a>
            </div>
        </td>
        <td>
            <a href="../product-detail.html?cid=${json[i].cid}" class="action-icon"> <i class="fa fa-mail-forward"></i></a>
            <a href="#" class="action-icon" onclick="removelike(this)" cid="${json[i].cid}"> <i class="zmdi zmdi-delete"></i></a>
        </td>
    </tr>`
        $("#orderbox tbody").append(str)
    }
}
function removelike(element){
    var cid=$(element).attr("cid")
    $.post("http://127.0.0.1:25564/shoucang/del",
{
    cid:cid,
    uuid,uuid
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

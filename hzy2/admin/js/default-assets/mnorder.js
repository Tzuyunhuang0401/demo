var uuid=localStorage.getItem("uuid");
$.post("http://127.0.0.1:25564/payment/getall",
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
        if(json[i].pay=='已完成'){
            var str=`<tr>
            <td>
                ${json[i].pid}
            </td>
            <td>
            ${json[i].money}元
            </td>
            <td>
            ${json[i].date}
            </td>
            <td>
                <div class="product-en-btn">
                    <a class="badge badge-success-lighten">${json[i].pay}</a>
                </div>
            </td>
            <td>
                <a href="javascript:void(0);" class="action-icon" onclick="removeorder(this)" pid="${json[i].pid}"> <i class="zmdi zmdi-delete"></i></a>
                <a href="javascript:void(0);" class="action-icon" onclick="finish(this)" pid="${json[i].pid}"> <i class="fa fa-check"></i></a>
                <a href="javascript:void(0);" class="action-icon" onclick="unfinish(this)" pid="${json[i].pid}"> <i class="fa fa-close"></i></a>
            </td>
        </tr>`
        }
        else{
            var str=`<tr>
            <td>
                ${json[i].pid}
            </td>
            <td>
            ${json[i].money}元
            </td>
            <td>
            ${json[i].date}
            </td>
            <td>
                <div class="product-en-btn">
                    <a class="badge badge-danger-lighten">${json[i].pay}</a>
                </div>
            </td>
            <td>
                <a href="javascript:void(0);" class="action-icon" onclick="removeorder(this)" pid="${json[i].pid}"> <i class="zmdi zmdi-delete"></i></a>
                <a href="javascript:void(0);" class="action-icon" onclick="finish(this)" pid="${json[i].pid}"> <i class="fa fa-check"></i></a>
                <a href="javascript:void(0);" class="action-icon" onclick="unfinish(this)" pid="${json[i].pid}"> <i class="fa fa-close"></i></a>
            </td>
        </tr>`
        }
        $("#orderbox tbody").append(str)
    }
}
function removeorder(element){
    var pid=$(element).attr("pid")
    $.post("http://127.0.0.1:25564/payment/del",
{
    pid:pid,
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
function finish(element){
    var pid=$(element).attr("pid")
    $.post("http://127.0.0.1:25564/payment/update",
{
    pid:pid,
    pay:'已完成'
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        alert("更新成功")
        window.location.reload()
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
function unfinish(element){
    var pid=$(element).attr("pid")
    $.post("http://127.0.0.1:25564/payment/update",
{
    pid:pid,
    pay:'未完成'
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        alert("更新成功")
        window.location.reload()
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
function searchpid(element){
    var pid=$("#pidid").val()
    $.post("http://127.0.0.1:25564/payment/detail",
{
    pid:pid,
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
}

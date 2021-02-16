$.post("http://127.0.0.1:25564/item/getall",
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
        ${json[i].cid}
        </td>
        <td>
        ${json[i].name}
        </td>
        <td>
        ${json[i].price}
        </td>
        <td>
            <div class="product-en-btn">
                <a class="badge badge-success-lighten">${json[i].cate}</a>
            </div>
        </td>
        <td>
            <a href="javascript:void(0);" class="action-icon" onclick="removeorder(this)" pid="${json[i].cid}"> <i class="zmdi zmdi-delete"></i></a>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal5">
                                                更改价格
                                            </button>
            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">更改价格</h4>
                                                    </div>
                                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>更改价格</label>
                                            <input type="text" class="form-control" placeholder="输入要更改的价格" id="price${i}">
                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
                                                        <button type="button" class="btn btn-primary" count="${i}" pid="${json[i].cid}" onclick="change(this)">提交</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        </td>
    </tr>`
        $("#orderbox tbody").append(str)
    }
}
function removeorder(element){
    var pid=$(element).attr("pid")
    $.post("http://127.0.0.1:25564/item/del",
{
    cid:pid,
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
function change(element){
    var pid=$(element).attr("pid")
    console.log(pid)
    var count=$(element).attr("count")
    console.log(count)
    var price=$("#price"+count).val()
    console.log(price)
    $.post("http://127.0.0.1:25564/item/change",
        {
            cid:pid,
            price:price
        },
        function(data,status){
            var datas=JSON.parse(data);
            if(datas.status == "success"){
                console.log(data)
                alert("更新成功")
                window.location.reload()
            }
            else{
                alert(datas.status)
            }
        });
}


var uuid=localStorage.getItem("uuid");
var shoppingitem=localStorage.getItem("shoppingitem");
if (shoppingitem == null|shoppingitem ==''){
    var shoppingitem =new Array();
}
else {
    shoppingitem=JSON.parse(shoppingitem)
}
var money=localStorage.getItem("money");
$.post("http://127.0.0.1:25564/shopping/getdetail",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl2(datas.data);
    }
    else{
        console.log("状态:"+datas.status)
    }
});
if (uuid == null || uuid == ""){
}
else{
    $("#log").empty();
    var str=`<a href="admin/login.html" class="register" onclick="logout(this)">注销</a>`
    $("#log").append(str)
}
if(money == null || money == ""){
    money = 0
}
$("#allfeiyong").text('$'+money);
$("#subtotal").text('$'+money);
$("#check1").attr("href","admin/checkout.html?count="+money);
$("#check2").attr("href","admin/checkout.html?count="+money);
//$("#check3").attr("href","admin/checkout.html?count="+money);
$.post("http://127.0.0.1:25564/shopping/getdetail",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.data);
    }
    else{
        alert("状态:"+datas.status)
    }
});
function clearcart(element){
    localStorage.setItem("shoppingitem","")
    localStorage.setItem("money","")
    $("#datatable tbody").empty();
    $("#allfeiyong").text('$0');
    $("#subtotal").text('$0');
    $.post("http://127.0.0.1:25564/shopping/clear",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
function innerHTMl(data){
    $("#datatable tbody").empty();
    var json = eval(data);
    for(var i=0; i<json.length; i++) 
    {
        var str=` <tr class="cart_item">
        <td class="product-thumbnail" data-title="">
            <a href="#"><img height="150" width="185" alt="s_c" class="attachment-shop_thumbnail wp-post-image" src="assets/images/${json[i].cid}.jpg"></a>
        </td>
        <td class="product-name" data-title="Product Name">
            <a href="#">${json[i].name}</a>
        </td>
        <td class="product-price" data-title="Unit Price">
            <span class="amount">$${json[i].price}</span>
        </td>
        <td class="product-subtotal" data-title="Subtotal">
        <a class="button button-check-out" href="product-detail.html?cid=${json[i].cid}">查看物品</a>
        </td>
                <td class="product-subtotal" data-title="Subtotal">
        <a class="button button-check-out" href="#" cid="${json[i].cid}" money="${json[i].price}" onclick="delgwc(this)">删除</a>
        </td>
    </tr>`
        $("#datatable tbody").append(str);
    }
}
function delgwc(element) {
    let money2=$(element).attr("money");
    let cid=$(element).attr("cid");
    let count=parseInt(money)-parseInt(money2)
    console.log(money2)
    console.log(money)
    console.log(count)
    localStorage.setItem("money",count)
    let c=shoppingitem.indexOf(cid)
    shoppingitem.splice(c,c+1)
    localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
    $.post("http://127.0.0.1:25564/shopping/change",
        {
            uuid:uuid,
            shoppingitem:JSON.stringify(shoppingitem),
            discount:'1',
            money:count,
        },
        function(data,status){
            var datas=JSON.parse(data);
            if(datas.status == "success"){
                console.log(data);
                alert("删除成功！")
                window.location.reload();
            }
            else{
                console.log("状态:"+datas.status)
            }
        });
}
function innerHTMl2(data){
    var json = eval(data);
    $("#smallcart").empty();
    for(var i=0; i<json.length; i++) 
    {
        var str=`<ul class="list-hover-cart">
        <li class="hover-cart-item">
            <a href="#" class="img-hover-cart">
                <img src="assets/images/${json[i].cid}.jpg" alt="img-hover-cart" width="75" height="89">
                <span class="delete-product-hover-cart"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
            </a>
            <div class="text-hover-cart">
                <a href="#" class="name-hover-cart">${json[i].name}</a>
            </div>
            <div class="price-hover-cart">$${json[i].price}</div>
        </li>
    </ul>`
        $("#smallcart").append(str);
        $("#countm").text(money+'元')
        $("#check3").attr("href","checkout.html?count="+money);
    }
}
function logout(element){
    localStorage.setItem("uuid","")
}
function search(element){
    $.post("http://127.0.0.1:25564/item/getsp",
    {
        cate:$("#show-categories").val(),
        like:$("#searchbar").val(),
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data)
            $("#productlist1").empty()
            innerHTMl(datas.data);
        }
        else{
            alert("状态:"+datas.status)
        }
    });
    }
var cid =getQueryVariable("cid");
var uuid=localStorage.getItem("uuid");
var shoppingitem=localStorage.getItem("shoppingitem");
var money=localStorage.getItem("money");
$.post("http://127.0.0.1:25564/shopping/getdetail",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl3(datas.data);
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
if(money == null || money === ""){
    money = 0
}
console.log(shoppingitem)
console.log(money)
console.log(cid);
$.post("http://127.0.0.1:25564/item/getcid",
{
    cid:cid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas);
    }
    else{
        alert("状态:"+datas.status)
    }
});
function addcart(element){
    var cid=$(element).attr("cid");
    var money2=$(element).attr("money");
    var all
    var shoplist
    if (shoppingitem == null) {
        shoplist=cid
        localStorage.setItem("shoppingitem",shoplist)
    }
    else{
        shoplist=shoppingitem+','+cid;
        localStorage.setItem("shoppingitem",shoplist)
    }
    if(money == null){
        all=money2
        localStorage.setItem("money",all)
    }
    else{
        all=parseInt(money)+parseInt(money2)
        localStorage.setItem("money",all)
    }
    console.log(cid);
    $.post("http://127.0.0.1:25564/shopping/change",
{
    uuid:uuid,
    shoppingitem:shoplist,
    discount:'1',
    money:all,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        alert("添加成功！")
    }
    else{
        console.log("状态:"+datas.status)
    }
});
}
function innerHTMl(data){
    var json=eval(data);
    $("#productname").text(json.name);
    $("#productcate").text(json.cate);
    $("#productprice").text(json.price+"元");
    $("#productdes").text(json.description);
    $("#1a").text(json.description);
    $("#2a").text(json.description);
    $("#productname").text(json.name);
    $("#productimg").attr("src","assets/images/"+json.cid+".jpg");
    $("#addbutton").attr("cid",json.cid);
    $("#addbutton").attr("money",json.price);
    $.post("http://127.0.0.1:25564/item/get",
{
    cate:json.cate,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl2(datas.data);
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
function innerHTMl2(data){
    var json=eval(data);
    $("#relatedlist1").empty();
    for(var i=0; i<json.length; i++) 
    {
        var str=`<div class="product-box">
        <div class="product-box-content">
            <figure class="img-product">
                <img src="assets/images/${json[i].cid}.jpg" alt="product" height="207" width="175">
                <a href="#" class="flaticon-search"></a>
            </figure>
            <div class="product-box-text">
                <a href="#" class="product-name">${json[i].name}</a>
                <p class="product-cost">$${json[i].price}</p>
                <div class="product-box-bottom">
                    <a href="#" class="add-to-cart" cid="${json[i].cid}" money="${json[i].price}" onclick="addcart(this)"><i class="flaticon-commerce"></i>Add To Cart</a>
                    <a href="#" class="refresh-product"><i class="flaticon-arrows"></i></a>
                </div>
            </div>
        </div>
    </div>`
        $("#relatedlist1").append(str);
    }
}
function innerHTMl3(data){
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
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
};
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
function addlike(element){
    $.post("http://127.0.0.1:25564/shoucang/add",
    {
        cid:cid,
        uuid:uuid,
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data)
            alert("成功添加到收藏")
        }
        else{
            alert("状态:"+datas.status)
        }
    });
}
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
    $("#loginc").remove()
    $("#loginc2").remove()
}
$.post("http://127.0.0.1:25564/item/getall",
{
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
function innerHTMl(data){
    var json = eval(data);
    $("#deallist1").empty();
    $("#dealist2").empty();
    for(var i=0; i<=8; i++) 
    {
        var str=`<div class="item-product-deal">
        <figure><img src="assets/images/${json[i].cid}.jpg" alt="feature" width="200" height="238"></figure>
        <div class="hot-deal-count">
            <div class="hot-deal-countdown">
                <div class="countdown-time" data-countdown="2020/12/10"></div>
            </div>
        </div>
        <a href="product-detail.html?cid=${json[i].cid}" class="feature-slide-name">${json[i].name}</a>
        <div class="feature-slide-cost">
            价格 <span class="price">$${json[i].price}</span>
        </div>
        </div>`
        $("#deallist1").append(str);
    }
    for(var i=0;i<=6;i++){
        var str=`<div class="product-list-content equal-elem">
        <div class="product-media">
            <figure><a href="#"><img src="assets/images/${json[i].cid}.jpg" alt="feature" width="202" height="239"></a></figure>
        </div>
        <a href="product-detail.html?cid=${json[i].cid}" class="feature-slide-name">${json[i].name} </a>
        <div class="feature-slide-cost">
            <span class="price">$${json[i].price}</span>
        </div>
        </div>`
        $("#dealist2").append(str);
    }
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
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
var cate =getQueryVariable("cp");
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
if(money == null || money === ""){
    money = 0
}
console.log(cate);

$.post("http://127.0.0.1:25564/item/get",
{
    cate:cate,
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
function addcart(element){
    shoppingitem.push($(element).attr("cid"))
    localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
    var money2=$(element).attr("money");
    var all
    if(localStorage.getItem("money") == null|localStorage.getItem("money")==""){
        all=money2
        localStorage.setItem("money",all)
    }
    else{
        all=parseInt(localStorage.getItem("money"))+parseInt(money2)
        localStorage.setItem("money",all)
    }
    console.log(shoppingitem)
    $.post("http://127.0.0.1:25564/shopping/change",
{
    uuid:uuid,
    shoppingitem:JSON.stringify(shoppingitem),
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
    $("#productlist1").empty();
    for(var i=0; i<json.length; i++) 
    {
        var str=`<div class="product-box">
        <div class="product-box-content">
            <figure class="img-product">
                <img src="assets/images/${json[i].cid}.jpg" alt="product" height="207" width="175">
                <a href="#" class="flaticon-search"></a>
            </figure>
            <div class="product-box-text">
                <a href="product-detail.html?cid=${json[i].cid}" class="product-name">${json[i].name}</a>
                <a href="product-detail.html?cid=${json[i].cid}" class="write">${json[i].cate}</a>
                <p class="product-cost">$${json[i].price}</p>
                <p class="desc-product">Cum altera mandamus in, mea verear disputationi et.
                    Vel regione discere ut, legere expetenda ut eos. In nam nibh invenire similique.
                    Atqui mollis ea his, ius graecis accommodare te. No eam tota nostrum cotidieque.
                </p>
                <div class="product-box-bottom">
                    <a href="#" cid="${json[i].cid}" money="${json[i].price}" class="add-to-cart" onclick="addcart(this)"><i class="flaticon-commerce"></i>Add To Cart</a>
                    <a href="#" class="refresh-product"><i class="flaticon-arrows"></i></a>
                </div>
            </div>
        </div>
    </div>`
        $("#productlist1").append(str);
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
function searchjiage(element){
    var lowprice= $("#lowprice").text()
    var highprice=$("#highprice").text()
    $.post("http://127.0.0.1:25564/item/search",
    {
        cate:cate,
        lowprice:lowprice,
        highprice:highprice
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